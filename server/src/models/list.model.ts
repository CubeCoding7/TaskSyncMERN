import mongoose from 'mongoose';

export interface ListDocument extends mongoose.Document {
	user_id: mongoose.Types.ObjectId;
	name: string;
	tasks: mongoose.Types.ObjectId[];
	category: String;
	createdAt: Date;
	updatedAt: Date;
}

const ListSchema = new mongoose.Schema<ListDocument>(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
		category: {
			type: String,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);

const ListModel = mongoose.model<ListDocument>('List', ListSchema);
export default ListModel;
