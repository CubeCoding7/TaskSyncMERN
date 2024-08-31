import express, { Request, Response } from 'express';
import {
	getTasks,
	getTask,
	createTask,
	deleteTask,
	updateTask,
} from '../controllers/taskController';

const router = express.Router();

router.get('/', getTasks);

router.get('/:id', getTask);

router.post('/', createTask);

router.delete('/:id', deleteTask);

router.patch('/:id', updateTask);

export default router;
