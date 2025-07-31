import express from "express";
import helmet from "helmet";
import cors from "cors";
import GhostRouter from "./routers/GhostRouter"
import GutenbergRouter from "./routers/GutenbergRouter"
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import { unknownEndpoint } from "./middleware/unknownEndpoint";

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(helmet())
} else {
  app.use(cors());
  app.use(requestLogger);
}

app.use(express.static("dist"));
app.use(express.json());

app.use(GhostRouter);
app.use(GutenbergRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
