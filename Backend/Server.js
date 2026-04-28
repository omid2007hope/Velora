const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { getEnvConfig, loadEnv } = require("./config/env");
const connectDB = require("./database/MongoDB");
const routes = require("./routes");
const { apiLimiter } = require("./middleware/request/rateLimit");
const { errorHandler } = require("./middleware/error/errorHandler");
const { notFoundHandler } = require("./middleware/error/notFound");
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
        (process.env.NODE_ENV !== "production" && localhostPattern.test(origin))
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
      if (/^\/api\/server\/webhook\/stripe$/i.test(req.originalUrl)) {
        req.rawBody = buffer;
      }
    },
  }),
);
app.use(express.urlencoded({ extended: true }));

app.use(apiLimiter);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

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
