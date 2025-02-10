import express, { Request, Response } from "express";
import { loginUser, registerUser } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/login", (req: Request, res: Response) => {
  loginUser(req, res);
});
userRouter.post("/register", (req: Request, res: Response) => {
  registerUser(req, res);
});

export default userRouter;
