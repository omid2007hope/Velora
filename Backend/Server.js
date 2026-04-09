const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { getEnvConfig, loadEnv } = require("./config/env");
const connectDB = require("./database/MongoDB");
const routes = require("./routes");
const logger = require("./utils/logger");

loadEnv();

const app = express();
const { port, allowedOrigins } = getEnvConfig();
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

app.use(
  express.json({
    type: "application/json",
    limit: "1mb",
    verify: (req, _res, buffer) => {
      if (/^\/(?:api\/)?(?:v1\/)?server\/webhook\/stripe$/i.test(req.originalUrl)) {
        req.rawBody = buffer;
      }
    },
  }),
);
app.use(express.urlencoded({ extended: true }));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(routes);
app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error("Unhandled error:", err);

  if (err?.status) {
    return res.status(err.status).json({ error: err.message });
  }

  return res.status(500).json({ error: "Internal server error" });
});

if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(port, () => {
        logger.info(`Server running on http://localhost:${port}`);
      });
    })
    .catch((error) => {
      logger.error("Failed to connect to database:", error);
      process.exit(1);
    });
}

module.exports = app;

