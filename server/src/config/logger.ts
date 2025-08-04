import { createLogger, transports, format } from "winston";
import { NODE_ENV, LOG_LEVEL } from "./env";

const logger = createLogger({
  transports: [
    new transports.Console({
      level: LOG_LEVEL
    }),
    new transports.File({
      dirname: "logs",
      filename: `${NODE_ENV}.log`,
      level: LOG_LEVEL
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