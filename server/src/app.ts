import express from "express";
import helmet from "helmet";
import cors from "cors";
import GhostsRouter from "./routers/GhostsRouter"
import GutenbergRouter from "./routers/GutenbergRouter"
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import { unknownEndpoint } from "./middleware/unknownEndpoint";

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(helmet())
} else {
  app.use(cors());
  app.use(requestLogger);
}

app.use(express.static("public"));

app.use("/ghosts", GhostsRouter);
app.use("/gutenberg", GutenbergRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
