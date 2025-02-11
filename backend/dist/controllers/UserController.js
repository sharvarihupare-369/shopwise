"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const BlackListModel_1 = __importDefault(require("../models/BlackListModel"));
const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await UserModel_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).send({ success: false, message: "User already exists!" });
            return;
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const user = await UserModel_1.default.create({
            ...req.body,
            password: hashPassword,
        });
        res.status(201).send({
            success: true,
            message: "User registered Successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await UserModel_1.default.findOne({ email });
        if (!existingUser) {
            res
                .status(400)
                .send({ success: false, message: "Please register first!" });
            return;
        }
        const comparePassword = await bcrypt_1.default.compare(password, existingUser.password);
        if (!comparePassword) {
            res.status(400).send({ success: false, message: "Invalid Password!" });
        }
        const secretKey = process.env.secretKey || "";
        if (!secretKey) {
            throw new Error("JWT Secret key is not defined");
        }
        const token = jsonwebtoken_1.default.sign({ userId: existingUser._id, email: email }, secretKey, { expiresIn: "3d" });
        res.status(200).send({
            success: true,
            message: "User LoggedIn Successfully...",
            data: { token, username: existingUser.full_name },
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
exports.loginUser = loginUser;
const logoutUser = async (req, res) => {
    try {
        const token = req?.headers["authorization"]?.split(" ")[1];
        if (!token) {
            res.status(400).send({ success: false, message: "No token provided!" });
            return;
        }
        await BlackListModel_1.default.create({ token });
        res.status(200).send({ success: true, message: "User Logged Out" });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=UserController.js.map