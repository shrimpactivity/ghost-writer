import app from "./app";
import { logger } from "./config/logger";
import { LOG_LEVEL, NODE_ENV } from "./config/env";

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, "0.0.0.0", () => {
  logger.info("Starting server...");
  logger.info(`NODE_ENV: ${NODE_ENV}`);
  logger.info(`LOG_LEVEL: ${LOG_LEVEL}`);
  logger.info(`Server running on port ${PORT}`);
});
