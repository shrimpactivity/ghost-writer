import { Request, Response } from "express";

export function unknownEndpoint(_req: Request, res: Response) {
  res.status(404).send("Unknown endpoint");
}
