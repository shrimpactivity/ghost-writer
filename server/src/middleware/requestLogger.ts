import { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger";

export function requestLogger(req: Request, _res: Response, next: NextFunction) {
  logger.debug(`${req.method} ${req.path}`);
  if (Object.keys(req.body).length) logger.debug(JSON.stringify(req.body));
  next();
}
