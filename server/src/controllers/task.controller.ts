import { Request, Response } from 'express';
import { z } from 'zod';
import mongoose from 'mongoose';
import Task from '../models/task.model';
import catchErrors from '../utils/catchErrors';
import appAssert from '../utils/appAssert';
import { NOT_FOUND, OK, BAD_REQUEST } from '../constants/http';
import TaskModel from '../models/task.model';

// Handler to get all tasks for the user
export const getTasks = catchErrors(async (req: Request, res: Response) => {
	const userId = req.userId;
	const tasks = await Task.find({ user_id: userId }).sort({ createdAt: -1 });
	return res.status(OK).json(tasks);
});

// Handler to get a single task by ID
export const getTask = catchErrors(async (req: Request, res: Response) => {
	const taskId = z.string().parse(req.params.id);
	appAssert(mongoose.Types.ObjectId.isValid(taskId), NOT_FOUND, 'No such task');
	const task = await Task.findOne({ _id: taskId, user_id: req.userId });
	appAssert(task, NOT_FOUND, 'No such task');
	return res.status(OK).json(task);
});

// Handler to create a new task
export const createTask = catchErrors(async (req: Request, res: Response) => {
	const { name, description, dueDate } = req.body;

	// Ensure name is provided
	if (!name) {
		return res.status(BAD_REQUEST).json({
			error: 'Name is required',
		});
	}

	// Create the task
	const userId = req.userId;
	const task = await Task.create({
		name,
		description, // Optional
		dueDate, // Optional
		user_id: userId, // Correct field name according to schema
	});
	return res.status(201).json(task);
});

// Handler to delete a task by ID
export const deleteTask = catchErrors(async (req: Request, res: Response) => {
	const taskId = z.string().parse(req.params.id);
	appAssert(mongoose.Types.ObjectId.isValid(taskId), NOT_FOUND, 'No such task');
	const task = await Task.findOneAndDelete({
		_id: taskId,
		user_id: req.userId,
	});
	appAssert(task, NOT_FOUND, 'No such task');
	return res.status(OK).json({ message: 'Task removed' });
});

// Handler to update a task by ID
export const updateTask = catchErrors(async (req: Request, res: Response) => {
	const taskId = z.string().parse(req.params.id);
	appAssert(mongoose.Types.ObjectId.isValid(taskId), NOT_FOUND, 'No such task');
	const task = await Task.findOneAndUpdate(
		{ _id: taskId, user_id: req.userId }, // Ensure task belongs to the user
		req.body,
		{ new: true }
	);
	appAssert(task, NOT_FOUND, 'No such task');
	return res.status(OK).json(task);
});

export const completeTask = catchErrors(async (req: Request, res: Response) => {
	const taskId = z.string().parse(req.params.id);
	appAssert(
		mongoose.Types.ObjectId.isValid(taskId),
		NOT_FOUND,
		'Invalid task ID'
	);

	const task = await Task.findOne({ _id: taskId, user_id: req.userId });
	appAssert(task, NOT_FOUND, 'No such task');

	// Toggle completion status
	task.completed = !task.completed;
	await task.save();

	return res.status(OK).json(task);
});
