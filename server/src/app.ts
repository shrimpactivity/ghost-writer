import path from "path";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { GutendexService } from "./services/GutendexService";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import { unknownEndpoint } from "./middleware/unknownEndpoint";
import defaultBooks from "./data/books.json";
import defaultBook from "./data/defaultBook.json"

const app = express();
const gutendexService = new GutendexService();

app.use(express.json());
app.use(requestLogger);

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
} else {
  app.use(cors());
}

app.get("/api/init", async (_req: Request, res: Response) => {
  res.status(200).json({ books: defaultBooks, default: defaultBook });
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
    if (isNaN(id)) {
      return res.status(400).send("Id must be a number");
    }
    
    const excludeText = Boolean(req.query.notext);
    try {
      if (id === defaultBook.id) {
        return res.status(200).json(defaultBook);
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

app.use(express.static(path.join(__dirname, 'public')));

// Catch-all for react-router
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
