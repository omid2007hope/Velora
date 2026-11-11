/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * NOTICE: This file contains proprietary source code licensed exclusively under the
 * terms of the LICENSE file in the root directory of this repository.
 * You may view, download, and compile this code solely to run the unmodified product.
 * Copying, pasting, modifying, redistributing, creating derivative works, or using
 * this code in any other project or AI training system is strictly prohibited.
 * Removal or alteration of this notice is a violation of 17 U.S.C. § 1202 and EU law.
 */

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
