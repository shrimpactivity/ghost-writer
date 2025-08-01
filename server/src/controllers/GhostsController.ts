import { Request, Response } from "express";
import { ghosts as localGhosts } from "../data/ghosts";

export class GhostsController {

  // Returns all locally hosted ghost names
  async getAll(_req: Request, res: Response) {
    const ghosts = localGhosts.map((ghost) => ({ ...ghost, data: undefined }));
    return res.status(200).json(ghosts);
  }

  // Returns specific local ghost data
  async findById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send("Id must be a number");
    }

    const ghost = localGhosts.filter((ghost) => ghost.id === id);
    if (!ghost) {
      return res.status(404).send(`Local ghost with id ${id} does not exist`)
    }
    return ghost;
  }
}