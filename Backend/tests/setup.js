// SPDX-License-Identifier: LicenseRef-Velora-Proprietary
/*
 * Copyright (c) 2026 Omid Teimory. All Rights Reserved.
 *
 * PROPRIETARY SOURCE-AVAILABLE SOFTWARE — NOT OPEN SOURCE.
 * Permission to view, clone, or compile this file is granted strictly on the
 * condition precedent of full compliance with the root ./LICENSE file.
 * Copying snippets, modifying, creating derivative works, redistributing,
 * commercial/SaaS use, and AI/ML training (reserved under EU Directive
 * 2019/790 Art. 4(3) and § 42h(6) Austrian UrhG) are strictly prohibited.
 * Removal or alteration of this notice violates 17 U.S.C. § 1202 and § 90c UrhG.
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
