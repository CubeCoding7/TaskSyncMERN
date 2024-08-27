import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userSchema";
import { AuthenticatedUser } from "../types/express"; // Import from the correct path

interface CustomRequest extends Request {
  user?: AuthenticatedUser;
}

interface DecodedToken {
  _id: string;
}

const requireAuth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET as string
    ) as DecodedToken;
    const user = await User.findOne({ _id: decoded._id }).select(
      "_id email password user_id"
    );

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user as AuthenticatedUser;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
