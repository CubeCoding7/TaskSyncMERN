import { Request, Response } from 'express';
import { z } from 'zod';
import mongoose from 'mongoose';
import Task from '../models/task.model';
import catchErrors from '../utils/catchErrors';
import appAssert from '../utils/appAssert';
import { NOT_FOUND, OK, BAD_REQUEST } from '../constants/http';

const dateRangeSchema = z.object({
	startDate: z.string().optional(),
	endDate: z.string().optional(),
});

export const getTasks = catchErrors(async (req: Request, res: Response) => {
	const userId = req.userId;

	const { startDate, endDate } = dateRangeSchema.parse(req.query);

	const query: any = { user_id: userId };
	if (startDate && endDate) {
		const start = new Date(startDate + 'Z');
		const end = new Date(endDate + 'Z');

		if (isNaN(start.getTime()) || isNaN(end.getTime())) {
			return res.status(BAD_REQUEST).json({ error: 'Invalid date format' });
		}

		query.dueDate = { $gte: start, $lte: end };
	}

	const tasks = await Task.find(query).sort({ createdAt: -1 });
	return res.status(OK).json(tasks);
});

export const getTask = catchErrors(async (req: Request, res: Response) => {
	const taskId = z.string().parse(req.params.id);
	appAssert(mongoose.Types.ObjectId.isValid(taskId), NOT_FOUND, 'No such task');
	const task = await Task.findOne({ _id: taskId, user_id: req.userId });
	appAssert(task, NOT_FOUND, 'No such task');
	return res.status(OK).json(task);
});

export const createTask = catchErrors(async (req: Request, res: Response) => {
	const taskSchema = z.object({
		name: z.string().nonempty(),
		description: z.string().optional(),
		dueDate: z.string().optional(),
	});

	const { name, description, dueDate } = taskSchema.parse(req.body);

	const userId = req.userId;

	const utcDueDate = dueDate ? new Date(dueDate + 'Z') : undefined;

	const task = await Task.create({
		name,
		description,
		dueDate: utcDueDate,
		user_id: userId,
	});

	return res.status(201).json(task);
});

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

export const updateTask = catchErrors(async (req: Request, res: Response) => {
	const taskId = z.string().parse(req.params.id);
	appAssert(mongoose.Types.ObjectId.isValid(taskId), NOT_FOUND, 'No such task');

	const updateSchema = z.object({
		name: z.string().optional(),
		description: z.string().optional(),
		dueDate: z.string().optional(),
		completed: z.boolean().optional(),
	});

	const updateData = updateSchema.parse(req.body);

	const task = await Task.findOneAndUpdate(
		{ _id: taskId, user_id: req.userId },
		updateData,
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

	task.completed = !task.completed;
	await task.save();

	return res.status(OK).json(task);
});
