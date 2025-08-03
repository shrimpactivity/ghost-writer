import app from "./app";
import { logger } from "./config/logger";
import { NODE_ENV } from "./config/env";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info("Starting server...")
  logger.info(`NODE_ENV: ${NODE_ENV}`);
  logger.info(`Server running on port ${PORT}`);
});