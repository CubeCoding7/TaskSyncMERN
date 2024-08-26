import { Request, Response } from "express";
import User from "../models/userSchema";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const createToken = (_id: string) => {
  const secret = process.env.SECRET as string;
  return jwt.sign({ _id }, secret, { expiresIn: "3d" });
};

// login user
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create token
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

// signup user
const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    //create token
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

export { signupUser, loginUser };
