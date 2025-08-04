import { readFileSync } from "fs";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { GutendexService } from "./services/GutendexService";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import { unknownEndpoint } from "./middleware/unknownEndpoint";
import { formatGutenbergText } from "./util/format";
import defaultBooks from "./data/defaultBooks.json";

const app = express();
const gutendexService = new GutendexService();

app.use(express.json());
app.use(requestLogger);

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
} else {
  app.use(cors());
}

app.use(express.static("public"));

app.get("/init", async (_req: Request, res: Response) => {
  const mobyDick = readFileSync("./src/data/moby_dick.txt").toString();
  res.status(200).json({ books: defaultBooks, defaultText: formatGutenbergText(mobyDick) });
});

app.get(
  "/gutenberg",
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query.search as string;
    if (!query) {
      return res.status(200).json([]);
    }
    try {
      const results = await gutendexService.search(query);
      return res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  },
);

app.get(
  "/gutenberg/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send("Id must be a number");
    }

    try {
      const book = await gutendexService.findById(id);
      if (book === null) {
        return res
          .status(404)
          .send(`Gutenberg book with id ${id} does not exist`);
      }

      return res.status(200).json(book);
    } catch (err) {
      next(err);
    }
  },
);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
