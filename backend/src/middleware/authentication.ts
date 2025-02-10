import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import BlackListModel from "../models/BlackListModel";

dotenv.config();

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).send({ message: "Access denied. No token provided" });
      return;
    }
    const isTokenBlacklisted = await BlackListModel.findOne({ token });
    if (isTokenBlacklisted) {
      res.status(400).send({ message: "Token is already blacklisted" });
      return;
    }
    const secretKey = process.env.secretKey || "";
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
    req.userId = decoded.userId as string;
    next();
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};
