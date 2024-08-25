import mongoose, { Schema, Model, Document } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

interface IUser extends Document {
  email: string;
  password: string;
}

interface IUserModel extends Model<IUser> {
  signup(email: string, password: string): Promise<IUser>;
}

const userSchema = new Schema<IUser, IUserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (email: string, password: string) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("Email already in use");
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

const User = mongoose.model<IUser, IUserModel>("User", userSchema);

export default User;
