import express from "express";
import { GhostController } from "../controllers/GhostController";

const router = express.Router();
const controller = new GhostController();

router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.findById.bind(controller));

export default router;