// src/controllers/task.controller.ts
import { Request, Response } from 'express';
import Task from '../models/task.model';
import mongoose from 'mongoose';

const getTasks = async (req: Request, res: Response) => {
	const user_id = req.userId;

	const tasks = await Task.find({ user_id }).sort({ createdAt: -1 });

	res.status(200).json(tasks);
};

const getTask = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such task' });
	}

	const task = await Task.findOne({ _id: id, user_id: req.userId });

	if (!task) {
		return res.status(404).json({ error: 'No such task' });
	}

	res.status(200).json(task);
};

const createTask = async (req: Request, res: Response) => {
	const { name, description, dueDate } = req.body;

	const emptyFields: string[] = [];

	if (!name) {
		emptyFields.push('name');
	}
	if (!description) {
		emptyFields.push('description');
	}
	if (!dueDate) {
		emptyFields.push('dueDate');
	}
	if (emptyFields.length > 0) {
		return res
			.status(400)
			.json({ error: 'Please fill in all the fields', emptyFields });
	}

	try {
		const user_id = req.userId;
		const task = await Task.create({ name, description, dueDate, user_id });
		res.status(201).json(task);
	} catch (err) {
		res.status(400).json({ error: (err as Error).message });
	}
};

// ... other controllers ...

export { getTasks, getTask, createTask, deleteTask, updateTask };
