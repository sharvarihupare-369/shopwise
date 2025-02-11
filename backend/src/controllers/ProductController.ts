import type { Request, Response } from "express";
import ProductModel from "../models/ProductModel";
import { APIResponse } from "../utils/types";
import CartModel from "../models/CartModel";

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

export const addToCart = async (
  req: Request,
  res: Response<APIResponse>
): Promise<void> => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;
    if (!userId) {
      res.status(400).send({ success: false, message: "Not authorized!" });
    }
    if (!productId) {
      res
        .status(400)
        .send({ success: false, message: "ProductID is required!" });
      return;
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      res.status(400).send({ success: false, message: "No Products Found" });
      return;
    }
    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = new CartModel({
        userId,
        items: [{ productId, quantity: quantity || 1 }],
      });
    } else {
      const itemsInd = cart.items.findIndex(
        (el) => el.productId.toString() === productId
      );
      if (itemsInd > -1) {
        cart.items[itemsInd].quantity += quantity || 1;
      } else {
        cart.items.push({ productId: productId, quantity: quantity || 1 });
      }
    }
    await cart.save();
    res
      .status(200)
      .send({ success: true, message: "Product added to cart", data: cart });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
