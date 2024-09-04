import mongoose from 'mongoose';

export interface TaskDocument extends mongoose.Document {
	name: string;
	description?: string;
	dueDate?: Date;
	user_id: mongoose.Types.ObjectId;
	completed: boolean;
	createdAt: Date;
	updatedAt: Date;
	category: string;
}

const taskSchema = new mongoose.Schema<TaskDocument>(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		dueDate: {
			type: Date,
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		completed: {
			type: Boolean,
			default: false,
		},
		category: {
			type: String,
			default: 'inbox',
		},
	},
	{
		timestamps: true,
	}
);

const TaskModel = mongoose.model<TaskDocument>('Task', taskSchema);
export default TaskModel;
