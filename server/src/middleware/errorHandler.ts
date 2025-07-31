import { NextFunction, Request, Response } from "express";
import { }

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const message = err.message || "An unexpected error occured";

  if (err instanceof NotFoundError) {
    return res.status(404).json({ message, type: "NotFoundError" });
  }

  if (err instanceof InvalidParamError) {
    return res.status(400).json({ message, type: "InvalidParamError" });
  }

  if (err instanceof AuthenticationError) {
    return res.status(401).json({ message, type: "AuthenticationError" });
  }

  if (err instanceof ValidationError) {
    let message = "";
    const fields = err.data;
    console.log(fields);
    for (let key of Object.keys(fields)) {
      fields[key] = fields[key].map((detail: any) => detail.message).join("; ");
      message += `- ${key} ${fields[key]}\r\n`;
    }
    message = message.trim();

    return res.status(400).json({ message, fields, type: "ValidationError" });
  }

  logger.log({ level: "error", message: err.toString(), error: err });

  return res.status(500).json({ message });
}