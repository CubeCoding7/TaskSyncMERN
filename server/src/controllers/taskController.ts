import { Request, Response } from 'express';
import Task from '../models/taskSchema';
import mongoose from 'mongoose';

const getTasks = async (req: Request, res: Response) => {
	// const user_id = req.user._id;

	const tasks = await Task.find({}).sort({ createdAt: -1 });

	res.status(200).json(tasks);
};

const getTask = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such task' });
	}

	const task = await Task.findById(id);

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
	if (emptyFields.length! > 3) {
		return res
			.status(400)
			.json({ error: 'Please fill in all the fields', emptyFields });
	}

	// if (!req.user) {
	//   return res.status(401).json({ error: "Unauthorized" });
	// }

	try {
		// const user_id = req.user._id;
		const task = await Task.create({ name, description, dueDate });
		res.status(200).json(task);
	} catch (err) {
		res.status(400).json({ error: (err as Error).message });
	}
};

const deleteTask = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such task' });
	}

	const task = await Task.findOneAndDelete({ _id: id });

	if (!task) {
		return res.status(404).json({ error: 'No such task' });
	}

	res.status(200).json(task);
};

const updateTask = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such task' });
	}

	const task = await Task.findOneAndUpdate(
		{ _id: id },
		{
			...req.body,
		}
	);

	if (!task) {
		return res.status(404).json({ error: 'No such task' });
	}

	res.status(200).json(task);
};

export { getTasks, getTask, createTask, deleteTask, updateTask };
