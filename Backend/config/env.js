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
    override: true,
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
      process.env.CLIENT_URL ||
        "http://localhost:3000,http://localhost:3001,http://localhost:5173",
    ),
    primaryClientUrl: getPrimaryClientUrl(),
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
      from: process.env.SMTP_FROM || "no-reply@velora.local",
      secure: process.env.SMTP_SECURE === "true",
    },
  };
}

module.exports = {
  getEnvConfig,
  loadEnv,
};
