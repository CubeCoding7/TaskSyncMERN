import bcrypt, { compare } from 'bcrypt';
import mongoose from 'mongoose';
import { boolean } from 'zod';
import { comparedValue, hashValue } from '../utils/bcrypt';

export interface UserDocument extends mongoose.Document {
	email: string;
	password: string;
	verified: boolean;
	createdAt: Date;
	updatedAt: Date;
	comparePassword(val: string): Promise<boolean>;
	omitPassword(): Pick<
		UserDocument,
		'_id' | 'email' | 'verified' | 'createdAt' | '__v'
	>;
}

const userSchema = new mongoose.Schema<UserDocument>(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		verified: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	this.password = await hashValue(this.password);
	return next();
});

userSchema.methods.comparePassword = async function (val: string) {
	return comparedValue(val, this.password);
};

userSchema.methods.omitPassword = function () {
	const user = this.toObject();
	delete user.password;
	return user;
};

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
