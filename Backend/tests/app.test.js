const request = require("supertest");
const app = require("../app");

const user = {
  fullName: "Test User",
  email: "test@example.com",
  password: "password123",
};

async function registerAndLogin() {
  await request(app).post("/server/customer").send(user).expect(201);
  const loginRes = await request(app)
    .post("/server/customer/login")
    .send({ email: user.email, password: user.password })
    .expect(200);

  return {
    token: loginRes.body.token,
    refreshToken: loginRes.body.refreshToken,
  };
}

describe("Auth and protected routes", () => {
  test("registration stays idempotent for an existing email", async () => {
    const first = await request(app).post("/server/customer").send(user).expect(201);
    const second = await request(app).post("/server/customer").send(user).expect(201);

    expect(first.body._id).toBeTruthy();
    expect(second.body._id).toBe(first.body._id);
    expect(second.body.existed).toBe(true);
    expect(second.body.source).toBe("database");
  });

  test("rejects unauthenticated cart access", async () => {
    await request(app).get("/server/cart").expect(401);
  });

  test("refresh token issues new access token", async () => {
    const { refreshToken } = await registerAndLogin();
    const res = await request(app)
      .post("/server/customer/token/refresh")
      .send({ refreshToken })
      .expect(200);

    expect(res.body.token).toBeTruthy();
  });

  test("cart and order flow with payment intent", async () => {
    const { token } = await registerAndLogin();

    const productRes = await request(app)
      .post("/server/products")
      .send({
        name: "Test Product",
        description: "Integration test product",
        price: 25,
        newPrice: 20,
        oldPrice: 25,
        discount: "20%",
        category: "Men",
        imageUrl: "https://example.com/image.jpg",
      })
      .expect(201);

    const productId = productRes.body?.data?._id;
    expect(productId).toBeTruthy();

    await request(app)
      .post("/server/cart/item")
      .set("Authorization", `Bearer ${token}`)
      .send({ productId, quantity: 2 })
      .expect(201);

    const orderRes = await request(app)
      .post("/server/checkout/order")
      .set("Authorization", `Bearer ${token}`)
      .send({
        items: [{ productId, quantity: 2 }],
        shipping: 5,
        tax: 1.5,
        currency: "usd",
        addressSnapshot: {
          street: "123 Demo St",
          country: "AT",
          city: "Vienna",
          postalCode: "1010",
        },
      })
      .expect(201);

    expect(orderRes.body?.paymentIntent?.providerIntentId).toBeTruthy();
    expect(orderRes.body?.data?.total).toBeGreaterThan(0);
  });
});
