import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import userModel from "../models/user.model";
import { loginValidator, registerValidator } from "../models/validation.model";

// login user
const loginUser = async (req: Request, res: Response) => {
  const { error } = loginValidator.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "wrong password" });
    }

    const token = createToken(user._id);
    res
      .status(200)
      .json({ success: true, message: "login successfull", token, user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "error on login" });
  }
};

// create token
const createToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string);
};

// register user
const registerUser = async (req: Request, res: Response) => {
  const { error } = registerValidator.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, password } = req.body;
  try {
    // checking is user already exist
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res
        .status(400)
        .json({ success: false, message: "this email already registered" });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(200).json({
      success: true,
      token,
      message: "user registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "error on registering user" });
  }
};

export { loginUser, registerUser };
