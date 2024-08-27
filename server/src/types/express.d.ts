import { Request } from "express";
import { Document } from "mongoose";
import User from "../models/userSchema"; // Adjust the path to where your User model is defined

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}
