import mongoose from 'mongoose';
import { compareValue, hashValue } from '../utils/bcrypt';

export interface UserDocument extends mongoose.Document {
	email: string;
	username: string;
	password: string;
	verified: boolean;
	settings: Record<string, any>;
	createdAt: Date;
	updatedAt: Date;
	comparePassword(val: string): Promise<boolean>;
	omitPassword(): Pick<
		UserDocument,
		| '_id'
		| 'email'
		| 'username'
		| 'verified'
		| 'settings'
		| 'createdAt'
		| 'updatedAt'
		| '__v'
	>;
}

const userSchema = new mongoose.Schema<UserDocument>(
	{
		email: { type: String, required: true, unique: true },
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		verified: { type: Boolean, required: true, default: false },
		settings: {
			type: mongoose.Schema.Types.Mixed,
			default: {
				theme: 'light',
				notifications: true,
				color1: '0, 4, 255',
				color2: '0, 199, 123',
			},
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	this.password = await hashValue(this.password);
	return next();
});

userSchema.methods.comparePassword = async function (val: string) {
	return compareValue(val, this.password);
};

userSchema.methods.omitPassword = function () {
	const user = this.toObject();
	delete user.password;
	return user;
};

const UserModel = mongoose.model<UserDocument>('User', userSchema);
export default UserModel;
