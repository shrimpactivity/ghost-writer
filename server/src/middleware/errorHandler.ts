import { NextFunction, Request, Response } from "express";
import { InvalidParamError, NotFoundError } from "../util/error";
import { logger } from "../config/logger";


export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const message = err.message || "An unexpected error occured";

  if (err instanceof NotFoundError) {
    return res.status(404).json({ message, type: "NotFoundError" });
  }

  if (err instanceof InvalidParamError) {
    return res.status(400).json({ message, type: "InvalidParamError" });
  }

  logger.log({ level: "error", message: err.toString(), error: err });

  return res.status(500).json({ message });
}