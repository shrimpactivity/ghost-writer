import express from "express";
import { GhostsController } from "../controllers/GhostsController";

const router = express.Router();
const controller = new GhostsController();

router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.findById.bind(controller));

export default router;