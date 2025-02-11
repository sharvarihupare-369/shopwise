import type { Request, Response } from "express";
import ProductModel from "../models/ProductModel";
import { APIResponse } from "../utils/types";

export const getAllProducts = async (
  req: Request,
  res: Response<APIResponse>
): Promise<void> => {
  try {
    const products = await ProductModel.find();
    res.status(200).send({
      success: true,
      message: "Fetched All the Products",
      data: products,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
