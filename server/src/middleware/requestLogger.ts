import { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger";

export function requestLogger(req: Request, _res: Response, next: NextFunction) {
  logger.debug(`${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    logger.debug('Request body:', req.body);
  }
  next();
}
