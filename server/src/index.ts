import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";

config();

import taskRoutes from "./routes/tasks";
import userRoutes from "./routes/user";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log(`MongoDB connected`);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
