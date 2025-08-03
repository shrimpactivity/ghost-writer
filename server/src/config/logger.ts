import "dotenv/config";
import { createLogger, transports, format } from "winston";
import { NODE_ENV } from "./env";

const log_level = process.env.LOG_LEVEL || "info";

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      dirname: "logs",
      filename: `${NODE_ENV}.log`,
      level: log_level
    })
  ],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
});

export { logger }