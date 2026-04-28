const mongoose = require("mongoose");
const { getEnvConfig } = require("../config/env");
const logger = require("../utils/logger");

const connectDB = async () => {
  const { mongoUrl } = getEnvConfig();

  if (!mongoUrl) {
    throw new Error("MongoDB connection failed: MONGO_URL is not set");
  }

  try {
    await mongoose.connect(mongoUrl, {
      autoIndex: process.env.NODE_ENV !== "production",
    });

    logger.info("MongoDB connected");
  } catch (error) {
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
};

module.exports = connectDB;
