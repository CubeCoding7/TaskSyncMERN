import express, { Request, Response } from "express";
import {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController";
import requireAuth from "../middleware/requireAuth";

const router = express.Router();

router.use(requireAuth);

router.get("/", getTasks);

router.get("/:id", getTask);

router.post("/", createTask);

router.delete("/:id", deleteTask);

router.patch("/:id", updateTask);

export default router;
