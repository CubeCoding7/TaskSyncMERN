import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		dueDate: { type: Date },
		user_id: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Task', taskSchema);
