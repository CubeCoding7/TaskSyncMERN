import { Request, Response } from "express";
import Task from "../models/Task";
import mongoose from "mongoose";

//get all task
const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find({}).sort({ createdAt: -1 });

  res.status(200).json(tasks);
};

//get a single task
const getTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({ error: "No such task" });
  }

  res.status(200).json(task);
};

// create new task
const createTask = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  let emptyFields: string[] = [];

  if (!name) emptyFields.push("name");
  if (!description) emptyFields.push("description");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const task = await Task.create({ name, description });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

//delete a task
const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    return res.status(404).json({ error: "No such task" });
  }

  res.status(200).json(task);
};

//update a task
const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  const task = await Task.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!task) {
    return res.status(404).json({ error: "No such task" });
  }

  res.status(200).json(task);
};

export { getTasks, getTask, createTask, deleteTask, updateTask };
