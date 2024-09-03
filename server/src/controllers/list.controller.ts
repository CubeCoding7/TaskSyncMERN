import { Request, Response } from 'express';
import { z } from 'zod';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import List from '../models/list.model';
import catchErrors from '../utils/catchErrors';
import appAssert from '../utils/appAssert';
import { NOT_FOUND, OK, BAD_REQUEST } from '../constants/http';

export const getLists = catchErrors(async (req: Request, res: Response) => {
	const userId = req.userId;
	const lists = await List.find({ user_id: userId }).sort({ createdAt: -1 });
	return res.status(OK).json(lists);
});

export const getList = catchErrors(async (req: Request, res: Response) => {
	const listId = z.string().parse(req.params.id);
	appAssert(
		mongoose.Types.ObjectId.isValid(listId),
		NOT_FOUND,
		'There is no such list'
	);

	const list = await List.findOne({ _id: listId, user_id: req.userId });
	appAssert(list, NOT_FOUND, 'No such list');

	return res.status(OK).json(list);
});

// Handler to create a new list
export const createList = catchErrors(async (req: Request, res: Response) => {
	const { name } = req.body;

	// Ensure name is provided
	if (!name) {
		return res.status(BAD_REQUEST).json({
			error: 'Name is required',
		});
	}

	const uniqueCategory = uuidv4();

	// Create the list
	const userId = req.userId;
	const list = await List.create({
		name,
		user_id: userId,
		category: uniqueCategory,
	});
	return res.status(201).json(list);
});

// Handler to delete a list by ID
export const deleteList = catchErrors(async (req: Request, res: Response) => {
	const listId = z.string().parse(req.params.id);
	appAssert(mongoose.Types.ObjectId.isValid(listId), NOT_FOUND, 'No such list');
	const list = await List.findOneAndDelete({
		_id: listId,
		user_id: req.userId,
	});
	appAssert(list, NOT_FOUND, 'No such list');
	return res.status(OK).json({ message: 'List removed' });
});

// Handler to update a list by ID
export const updateList = catchErrors(async (req: Request, res: Response) => {
	const listId = z.string().parse(req.params.id);
	appAssert(mongoose.Types.ObjectId.isValid(listId), NOT_FOUND, 'No such list');
	const list = await List.findOneAndUpdate(
		{ _id: listId, user_id: req.userId }, // Ensure list belongs to the user
		req.body,
		{ new: true }
	);
	appAssert(list, NOT_FOUND, 'No such list');
	return res.status(OK).json(list);
});
