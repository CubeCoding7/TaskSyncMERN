import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectToDatabase from './config/db';
import { APP_ORIGIN, PORT } from './constants/env';
import taskRoutes from './routes/task.route';
import errorHandler from './middleware/errorHandler';
import authRoutes from './routes/auth.route';
import authenticate from './middleware/authenticate';
import userRoutes from './routes/user.route';
import sessionRoutes from './routes/session.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: APP_ORIGIN,
		credentials: true,
	})
);
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
	console.log(req.path, req.method);
	next();
});

app.use('/auth', authRoutes);
app.use('/tasks', authenticate, taskRoutes);
app.use('/user', authenticate, userRoutes);
app.use('/sessions', authenticate, sessionRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
	console.log(`Server running on port ${PORT}`);

	await connectToDatabase();
});
