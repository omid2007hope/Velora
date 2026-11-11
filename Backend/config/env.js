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

const path = require("path");
const dotenv = require("dotenv");

let loaded = false;

function loadEnv() {
  if (loaded) {
    return;
  }

  dotenv.config({ path: path.join(__dirname, "..", ".env") });
  dotenv.config({
    path: path.join(__dirname, "..", ".env.local"),
    override: process.env.NODE_ENV !== "test",
  });

  loaded = true;
}

function parseOrigins(value) {
  return String(value || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function getPrimaryClientUrl() {
  const [primaryOrigin] = parseOrigins(
    process.env.CLIENT_URL ||
      "http://localhost:3000,http://localhost:3001,http://localhost:5173",
  );

  return primaryOrigin || "http://localhost:3000";
}

function getEnvConfig() {
  loadEnv();

  return {
    isProduction: process.env.NODE_ENV === "production",
    isTest: process.env.NODE_ENV === "test",
    port: Number(process.env.PORT) || 3000,
    mongoUrl: process.env.MONGO_URL,
    allowedOrigins: parseOrigins(
      process.env.CLIENT_URL || "http://localhost:3000,http://localhost:3001,http://localhost:5173"
    ),
    primaryClientUrl: getPrimaryClientUrl(),
    emailjs: {
      serviceId: process.env.EMAILJS_SERVICE_ID,
      templateId: process.env.EMAILJS_TEMPLATE_ID,
      publicKey: process.env.EMAILJS_PUBLIC_KEY,
      privateKey: process.env.EMAILJS_PRIVATE_KEY,
      fromName: process.env.EMAILJS_FROM_NAME || "Velora",
      replyTo: process.env.EMAILJS_REPLY_TO || "no-reply@velora.local",
    },
  };
}

module.exports = {
  getEnvConfig,
  loadEnv,
};
