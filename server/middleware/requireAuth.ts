import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../src/models/userSchema";
import { Document } from "mongoose";

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
  };
}

const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET as string) as {
      _id: string;
    };

    const user = await User.findOne({ _id: decodedToken._id }).select("_id");

    if (!user) {
      return res.status(401).json({ error: "Request is not authorized" });
    }

    req.user = { _id: (user._id as unknown as string).toString() };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
