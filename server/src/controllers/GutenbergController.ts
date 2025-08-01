import { Request, Response } from "express";
import { GutenbergService } from "../services/GutenbergService";

const gutenbergService = new GutenbergService();

export class GutenbergController {
  
  // Search gutenberg catalog
  async search(req: Request, res: Response) {
    const { query } = req.query;
    const search 
  }

  // Get gutenberg catalog item transformed into a ghost
  async findById() {

  }
}