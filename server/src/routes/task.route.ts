import express, { Request, Response } from 'express';
import {
	getTasks,
	getTask,
	createTask,
	deleteTask,
	updateTask,
	completeTask,
} from '../controllers/task.controller';

const router = express.Router();

router.get('/', getTasks);

router.get('/:id', getTask);

router.post('/', createTask);

router.delete('/:id', deleteTask);

router.put('/:id', updateTask);

router.patch('/:id/complete', completeTask);

export default router;
