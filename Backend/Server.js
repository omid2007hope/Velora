const app = require("./app");
const { getEnvConfig } = require("./config/env");
const connectDB = require("./database/MongoDB");
const logger = require("./utils/logger");

const { port } = getEnvConfig();

connectDB()
  .then(() => {
    app.listen(port, () => {
      logger.info(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    logger.error("Failed to connect to database:", err);
    process.exit(1);
  });

