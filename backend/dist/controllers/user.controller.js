"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const validation_model_1 = require("../models/validation.model");
// login user
const loginUser = async (req, res) => {
    const { error } = validation_model_1.loginValidator.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    const { email, password } = req.body;
    try {
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "user not found" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ success: false, message: "wrong password" });
        }
        const token = createToken(user._id);
        res
            .status(200)
            .json({ success: true, message: "login successfull", token, user });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "error on login" });
    }
};
exports.loginUser = loginUser;
// create token
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET);
};
// register user
const registerUser = async (req, res) => {
    const { error } = validation_model_1.registerValidator.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    const { name, email, password } = req.body;
    try {
        // checking is user already exist
        const exist = await user_model_1.default.findOne({ email });
        if (exist) {
            return res
                .status(400)
                .json({ success: false, message: "this email already registered" });
        }
        //hashing user password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashPassword = await bcryptjs_1.default.hash(password, salt);
        const newUser = new user_model_1.default({
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
    }
    catch (error) {
        console.log(error);
        res
            .status(400)
            .json({ success: false, message: "error on registering user" });
    }
};
exports.registerUser = registerUser;
