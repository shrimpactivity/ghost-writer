import { NextFunction, Request, Response } from "express";
import { GutenbergService } from "../services/GutenbergService";

const gutenbergService = new GutenbergService();

export class GutenbergController {
  
  async search(req: Request, res: Response, next: NextFunction) {
    const query = req.query.search as string;
    if (!query) {
      return res.status(200).json([]);
    }
    try {
      const results = await gutenbergService.search(query);
      return res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send("Id must be a number");
    }

    try {
      const book = await gutenbergService.findById(id);
      if (book === null) {
        return res.status(404).send(`Gutenberg book with id ${id} does not exist`);
      }
  
      return res.status(200).json(book);
    } catch (err) {
      next(err);
    }
  }

  async findGhostById(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send("Id must be a number");
    }

    try {
      const ghost = await gutenbergService.findGhostById(id);
      if (ghost === null) {
        return res.status(404).send(`Unable to create ghost: Gutenberg book with id ${id} does not exist`);
      }
  
      return res.status(200).json(ghost);
    } catch (err) {
      next(err);
    }
  }
}