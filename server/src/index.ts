import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db";
import { APP_ORIGIN, PORT } from "./constants/env";
import taskRoutes from "./routes/tasks";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "./routes/auth.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/tasks", taskRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  await connectToDatabase();
});
