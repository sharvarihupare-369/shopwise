"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const BlackListModel_1 = __importDefault(require("../models/BlackListModel"));
dotenv_1.default.config();
const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).send({ message: "Access denied. No token provided" });
            return;
        }
        const isTokenBlacklisted = await BlackListModel_1.default.findOne({ token });
        if (isTokenBlacklisted) {
            res.status(400).send({ message: "Token is already blacklisted" });
            return;
        }
        const secretKey = process.env.secretKey || "";
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
};
exports.authentication = authentication;
//# sourceMappingURL=authentication.js.map