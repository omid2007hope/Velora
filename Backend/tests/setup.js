const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongo;

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret";
process.env.JWT_REFRESH_SECRET = "test-refresh-secret";
process.env.STRIPE_SECRET_KEY = "";

beforeAll(async () => {
  if (process.env.SKIP_TEST_DB === "true") {
    return;
  }

  mongo = await MongoMemoryServer.create();
  process.env.MONGO_URL = mongo.getUri();

  const connectDB = require("../database/MongoDB");
  await connectDB();
});

afterEach(async () => {
  if (process.env.SKIP_TEST_DB === "true") {
    return;
  }

  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.db.dropDatabase();
  }
});

afterAll(async () => {
  if (process.env.SKIP_TEST_DB === "true") {
    return;
  }

  await mongoose.connection.close();
  if (mongo) await mongo.stop();
});
