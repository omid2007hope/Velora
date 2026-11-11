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

const dns = require('node:dns');
const dnsAddress = ["1.1.1.1", "8.8.8.8"];
dns.setServers(dnsAddress);


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
