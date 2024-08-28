import { Request, Response } from "express";
import User from "../models/userSchema";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const createToken = (_id: string) => {
  const secret = process.env.SECRET as string;
  return jwt.sign({ _id }, secret, { expiresIn: "3d" });
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(String(user._id));

    res.status(201).json({ email, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

const signupUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.signup(firstName, lastName, email, password);

    const token = createToken(String(user._id));

    res.status(201).json({ firstName, lastName, email, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export { signupUser, loginUser };
