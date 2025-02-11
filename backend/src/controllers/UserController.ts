import type { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";
import {
  APIResponse,
  LoginUserRequest,
  RegisterUserRequest,
} from "../utils/types";
import BlackListModel from "../models/BlackListModel";

export const registerUser = async (
  req: RegisterUserRequest,
  res: Response<APIResponse>
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).send({ success: false, message: "User already exists!" });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      ...req.body,
      password: hashPassword,
    });
    res.status(201).send({
      success: true,
      message: "User registered Successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const loginUser = async (
  req: LoginUserRequest,
  res: Response<APIResponse>
): Promise<void> => {
  try {
   
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      res
        .status(400)
        .send({ success: false, message: "Please register first!" });
      return;
    }
    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!comparePassword) {
      res.status(400).send({ success: false, message: "Invalid Password!" });
    }
    const secretKey = process.env.secretKey || "";
    if (!secretKey) {
      throw new Error("JWT Secret key is not defined");
    }

    const token = jwt.sign(
      { userId: existingUser._id, email: email },
      secretKey,
      { expiresIn: "3d" }
    );
    res.status(200).send({
      success: true,
      message: "User LoggedIn Successfully...",
      data: { token, username: existingUser.fullName },
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const logoutUser = async (
  req: Request,
  res: Response<APIResponse>
): Promise<void> => {
  try {
    const token = req?.headers["authorization"]?.split(" ")[1];
    if (!token) {
      res.status(400).send({ success: false, message: "No token provided!" });
      return;
    }
    await BlackListModel.create({ token });
    res.status(200).send({ success: true, message: "User Logged Out" });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
