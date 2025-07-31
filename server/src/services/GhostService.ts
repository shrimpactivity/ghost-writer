import { ghosts } from "../data/ghosts";
import { NotFoundError } from "../util/error";

export class GhostService {
  
  getAll() {
    return ghosts;
  }

  getById(id: number) {
    const ghost = ghosts.filter((ghost) => ghost.id === id);
    if (!ghost) {
      throw new NotFoundError(`Ghost with id ${id} does not exist.`);
    }
  }

  create(_corpus: string) {

  }
}