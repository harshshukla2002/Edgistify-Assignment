import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { connectDb } from "./config/db";
import userRouter from "./routes/user.route";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "server is running", success: true });
});

app.listen(process.env.PORT, async () => {
  await connectDb();
  console.log(`server is running on http://localhost:4001/`);
});
