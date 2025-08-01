import express from "express";
import { GutenbergController } from "../controllers/GutenbergController";

const router = express.Router();
const controller = new GutenbergController();

router.get("/", controller.search.bind(controller));
router.get("/:id", controller.findById.bind(controller));

export default router;