"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const validation = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required!" });
            return;
        }
        const existingUser = await UserModel_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User with this email already exists!" });
            return;
        }
        if (password.length < 8) {
            res.status(400).json({
                message: "Password should be a minimum of 8 characters long",
            });
            return;
        }
        if (!/[A-Z]/.test(password)) {
            res.status(400).json({
                message: "Password should contain at least one uppercase letter",
            });
            return;
        }
        if (!/[0-9]/.test(password)) {
            res.status(400).json({
                message: "Password should contain at least one number",
            });
            return;
        }
        if (!/[!@#$%^*]/.test(password)) {
            res.status(400).json({
                message: "Password should contain at least one special character",
            });
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
exports.validation = validation;
//# sourceMappingURL=validation.js.map