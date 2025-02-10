import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export interface RegisterUserRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

export interface APIResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface LoginUserRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}