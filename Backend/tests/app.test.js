const request = require("supertest");
const app = require("../Server");

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

const storeOwnerUser = {
  storeOwnerName: "Seller User",
  storeOwnerEmailAddress: "seller@example.com",
  storeOwnerPassword: "Password123!",
};

async function registerAndLoginStoreOwner() {
  await request(app)
    .post("/server/store-owner")
    .send(storeOwnerUser)
    .expect(201);

  const loginRes = await request(app)
    .post("/server/store-owner/login")
    .send({
      storeOwnerEmailAddress: storeOwnerUser.storeOwnerEmailAddress,
      storeOwnerPassword: storeOwnerUser.storeOwnerPassword,
    })
    .expect(200);

  return {
    token: loginRes.body.token,
    refreshToken: loginRes.body.refreshToken,
  };
}

describe("Auth and protected routes", () => {
  test("api prefix serves the same health route", async () => {
    await request(app).get("/api/server").expect(200, "server is running");
    await request(app).get("/api/v1/server").expect(200, "server is running");
  });

  test("registration stays idempotent for an existing email", async () => {
    const first = await request(app)
      .post("/server/customer")
      .send(user)
      .expect(201);
    const second = await request(app)
      .post("/server/customer")
      .send(user)
      .expect(201);

    expect(first.body._id).toBeTruthy();
    expect(second.body._id).toBe(first.body._id);
    expect(second.body.existed).toBe(true);
    expect(second.body.source).toBe("database");
  });

  test("rejects unauthenticated cart access", async () => {
    await request(app).get("/server/cart").expect(401);
  });

  test("accepts lowercase bearer auth prefix", async () => {
    const { token } = await registerAndLogin();

    await request(app)
      .get("/server/cart")
      .set("Authorization", `bearer ${token}`)
      .expect(200);
  });

  test("rejects invalid product payloads before controller logic", async () => {
    const res = await request(app).post("/server/products").send({
      name: "Broken Product",
      description: "Missing required price/category/imageUrl",
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Validation failed");
  });

  test("returns 404 for a missing product id", async () => {
    const missingId = "507f191e810c19729de860ea";
    const res = await request(app).get(`/server/products/${missingId}`);

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Product not found");
  });

  test("refresh token issues new access token", async () => {
    const { refreshToken } = await registerAndLogin();
    const res = await request(app)
      .post("/server/customer/token/refresh")
      .send({ refreshToken })
      .expect(200);

    expect(res.body.token).toBeTruthy();
  });

  test("protected routes accept refresh-token-signed jwt as fallback auth", async () => {
    const { refreshToken } = await registerAndLogin();

    const res = await request(app)
      .get("/server/cart")
      .set("Authorization", `Bearer ${refreshToken}`)
      .expect(200);

    expect(res.body.data).toBeTruthy();
  });

  test("store owner routes support register, login, and refresh token", async () => {
    const createRes = await request(app)
      .post("/api/v1/server/store-owner")
      .send(storeOwnerUser)
      .expect(201);

    expect(createRes.body.data.storeOwnerEmailAddress).toBe(
      storeOwnerUser.storeOwnerEmailAddress,
    );

    const { refreshToken } = await registerAndLoginStoreOwner();
    const refreshRes = await request(app)
      .post("/server/store-owner/token/refresh")
      .send({ refreshToken })
      .expect(200);

    expect(refreshRes.body.token).toBeTruthy();
  });

  test("seller can create and list seller-owned products from the panel routes", async () => {
    const { token } = await registerAndLoginStoreOwner();

    const createRes = await request(app)
      .post("/server/seller/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Seller Panel Product",
        description: "Created from seller panel",
        price: 60,
        category: "Accessories",
        subCategory: "Bags",
        imageUrl: "https://example.com/seller-product.jpg",
      })
      .expect(201);

    expect(createRes.body?.data?.storeOwnerId).toBeTruthy();

    const listRes = await request(app)
      .get("/server/seller/products")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(listRes.body?.data)).toBe(true);
    expect(
      listRes.body.data.some(
        (product) => product.name === "Seller Panel Product",
      ),
    ).toBe(true);
  });

  test("seller can create and list seller-owned stores", async () => {
    const { token } = await registerAndLoginStoreOwner();

    const createRes = await request(app)
      .post("/server/seller/store")
      .set("Authorization", `Bearer ${token}`)
      .send({
        storeName: "Seller Test Store",
        storeDescription: "Created from integration test",
        countryStoreLocatedIn: "United States",
        stateOrProvinceStoreLocatedIn: "",
        cityStoreLocatedIn: "Los Angeles",
        storeAddress: "123 Main St",
        storeZipcode: "90001",
      })
      .expect(201);

    expect(createRes.body?.data?._id).toBeTruthy();

    const listRes = await request(app)
      .get("/server/seller/store")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(listRes.body?.data)).toBe(true);
    expect(
      listRes.body.data.some(
        (store) => store.storeName === "Seller Test Store",
      ),
    ).toBe(true);
  });

  test("seller-only store endpoints reject customer token", async () => {
    const { token } = await registerAndLogin();

    await request(app)
      .get("/server/seller/store")
      .set("Authorization", `Bearer ${token}`)
      .expect(403);

    await request(app)
      .post("/server/seller/store")
      .set("Authorization", `Bearer ${token}`)
      .send({
        storeName: "Blocked Store",
        storeDescription: "Should not be created by customer role",
        countryStoreLocatedIn: "United States",
        stateOrProvinceStoreLocatedIn: "California",
        cityStoreLocatedIn: "Los Angeles",
        storeAddress: "123 Main St",
        storeZipcode: "90001",
      })
      .expect(403);
  });

  test("customer profile routes create account, address, and payment method", async () => {
    const { token } = await registerAndLogin();

    const accountRes = await request(app)
      .post("/server/customer/login/account")
      .set("Authorization", `Bearer ${token}`)
      .send({
        phoneNumber: "+1-555-000-1234",
        dateOfBirth: "1990-01-15",
        gender: "male",
      })
      .expect(201);

    expect(accountRes.body?.data?.phoneNumber).toBe("+1-555-000-1234");

    const addressRes = await request(app)
      .post("/server/customer/login/account/address")
      .set("Authorization", `Bearer ${token}`)
      .send({
        country: "United States",
        city: "Los Angeles",
        street: "456 Sunset Blvd",
        postalCode: "90028",
      })
      .expect(201);

    expect(addressRes.body?.data?.city).toBe("los angeles");

    const paymentRes = await request(app)
      .post("/server/customer/login/account/payment")
      .set("Authorization", `Bearer ${token}`)
      .send({
        paymentMethodId: "pm_card_visa",
        billingName: "John Doe",
      })
      .expect(201);

    expect(paymentRes.body?.data?.paymentMethodId).toBe("pm_card_visa");
  });

  test("reviews flow creates and lists product reviews", async () => {
    const productRes = await request(app)
      .post("/server/products")
      .send({
        name: "Reviewed Product",
        description: "Product for review flow",
        price: 50,
        category: "Men",
        imageUrl: "https://example.com/reviewed-product.jpg",
      })
      .expect(201);

    const productId = productRes.body?.data?._id;
    expect(productId).toBeTruthy();

    await request(app)
      .post(`/server/products/${productId}/reviews`)
      .send({
        name: "Review User",
        rating: 5,
        comment: "Great product!",
      })
      .expect(201);

    const listRes = await request(app)
      .get(`/server/products/${productId}/reviews`)
      .expect(200);

    expect(Array.isArray(listRes.body?.data)).toBe(true);
    expect(listRes.body.data.length).toBeGreaterThan(0);
  });

  test("customer email verification and password reset lifecycle works", async () => {
    const customCustomer = {
      fullName: "Lifecycle User",
      email: "lifecycle@example.com",
      password: "Password123!",
      nextPassword: "NextPassword123!",
    };

    await request(app)
      .post("/server/customer")
      .send({
        fullName: customCustomer.fullName,
        email: customCustomer.email,
        password: customCustomer.password,
      })
      .expect(201);

    const emailVerifyRequest = await request(app)
      .post("/server/customer/email/verify")
      .send({ email: customCustomer.email, authView: "customer" })
      .expect(200);

    expect(emailVerifyRequest.body?.token).toBeTruthy();

    await request(app)
      .post("/server/customer/email/verify/confirm")
      .send({ token: emailVerifyRequest.body.token })
      .expect(200);

    const resetRequest = await request(app)
      .post("/server/customer/password-reset")
      .send({
        email: customCustomer.email,
        newPassword: customCustomer.nextPassword,
        authView: "customer",
      })
      .expect(200);

    expect(resetRequest.body?.token).toBeTruthy();

    await request(app)
      .post("/server/customer/password-reset/confirm")
      .send({ token: resetRequest.body.token })
      .expect(200);

    await request(app)
      .post("/server/customer/login")
      .send({
        email: customCustomer.email,
        password: customCustomer.nextPassword,
      })
      .expect(200);
  });

  test("store owner email verification and password reset lifecycle works", async () => {
    const customSeller = {
      storeOwnerName: "Lifecycle Seller",
      storeOwnerEmailAddress: "seller-lifecycle@example.com",
      storeOwnerPassword: "Password123!",
      nextPassword: "NextPassword123!",
    };

    await request(app)
      .post("/server/store-owner")
      .send({
        storeOwnerName: customSeller.storeOwnerName,
        storeOwnerEmailAddress: customSeller.storeOwnerEmailAddress,
        storeOwnerPassword: customSeller.storeOwnerPassword,
      })
      .expect(201);

    const emailVerifyRequest = await request(app)
      .post("/server/store-owner/email/verify")
      .send({ email: customSeller.storeOwnerEmailAddress })
      .expect(200);

    expect(emailVerifyRequest.body?.token).toBeTruthy();

    await request(app)
      .post("/server/store-owner/email/verify/confirm")
      .send({ token: emailVerifyRequest.body.token })
      .expect(200);

    const resetRequest = await request(app)
      .post("/server/store-owner/password-reset")
      .send({
        email: customSeller.storeOwnerEmailAddress,
        newPassword: customSeller.nextPassword,
      })
      .expect(200);

    expect(resetRequest.body?.token).toBeTruthy();

    await request(app)
      .post("/server/store-owner/password-reset/confirm")
      .send({ token: resetRequest.body.token })
      .expect(200);

    await request(app)
      .post("/server/store-owner/login")
      .send({
        storeOwnerEmailAddress: customSeller.storeOwnerEmailAddress,
        storeOwnerPassword: customSeller.nextPassword,
      })
      .expect(200);
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
