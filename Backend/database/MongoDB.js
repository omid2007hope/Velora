// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    console.error("MongoDB connection failed: MONGO_URL is not set");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUrl, {
      autoIndex: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;


