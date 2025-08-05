import path from "path";
import { readFileSync, existsSync } from "fs";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { GutendexService } from "./services/GutendexService";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import { unknownEndpoint } from "./middleware/unknownEndpoint";
import { formatGutenbergText } from "./util/format";
import defaultBooks from "./data/defaultBooks.json";
import { logger } from "./config/logger";

const app = express();
const gutendexService = new GutendexService();

app.use(express.json());
app.use(requestLogger);

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
} else {
  app.use(cors());
}

const CLIENT_DIR = path.join(__dirname, "../public");
if (existsSync(CLIENT_DIR)) {
  app.use("/static", express.static(CLIENT_DIR));
} else {
  logger.warn(`Client directory not found at ${CLIENT_DIR}.\nUse Vite client dev server.`);
}

app.get("/api/init", async (_req: Request, res: Response) => {
  const mobyDick = readFileSync("./src/data/moby_dick.txt").toString();
  res.status(200).json({ books: defaultBooks, defaultText: formatGutenbergText(mobyDick) });
});

app.get(
  "/api/gutenberg",
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
  "/api/gutenberg/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const excludeText = Boolean(req.query.notext);
    if (isNaN(id)) {
      return res.status(400).send("Id must be a number");
    }

    try {
      const mobyDickId = 2107;
      if (id === mobyDickId) {
        const mobyDick = readFileSync("./src/data/moby_dick.txt").toString();
        const book = defaultBooks.find(book => book.id === mobyDickId);
        if (!book) {
          throw new Error("Unable to locate default stored book");
        }
        return res.status(200).json({...book, text: mobyDick});
      }

      const book = await gutendexService.findById(id, excludeText);
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
