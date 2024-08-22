import express, { Request, Response } from "express";
import {
  getTask,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController";

const router = express.Router();

router.get("/placeholder", getTask);

router.post("/tasks/addTask", createTask);

router.post("/placeholder", createTask);

router.delete("/placeholder", deleteTask);

router.patch("/placeholder", updateTask);

export default router;
