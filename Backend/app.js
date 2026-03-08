const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { handleStripeWebhook } = require("./controller/version_1/Webhook");
const { getEnvConfig } = require("./config/env");
const router = require("./router/index");
const logger = require("./utils/logger");

const app = express();
const { allowedOrigins } = getEnvConfig();

const localhostPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i;

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        localhostPattern.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.post(
  "/server/webhook/stripe",
  express.raw({ type: "application/json" }),
  handleStripeWebhook,
);

app.use(express.json({ type: "application/json", limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(router);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error("Unhandled error:", err);
  if (err?.status) {
    return res.status(err.status).json({ error: err.message });
  }
  return res.status(500).json({ error: "Internal server error" });
});

module.exports = app;
