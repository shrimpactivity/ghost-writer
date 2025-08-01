import { Request, Response } from "express";
import { GutenbergService } from "../services/GutenbergService";

const gutenbergService = new GutenbergService();

export class GutenbergController {
  
  async search(req: Request, res: Response) {
    const query = req.query.search as string;
    if (!query) {
      return res.status(200).json([]);
    }
    const results = await gutenbergService.search(query);
    return res.status(200).json(results);
  }

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send("Id must be a number");
    }

    const book = await gutenbergService.findById(id);
    if (book === null) {
      return res.status(404).send(`Gutenberg book with id ${id} does not exist`);
    }

    return res.status(200).json(book);
  }
}