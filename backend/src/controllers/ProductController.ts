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
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity: quantity || 1 });
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

export const getCart = async (
  req: Request,
  res: Response<APIResponse>
): Promise<void> => {
  try {
    const userId = req.userId;
    const cart = await CartModel.find({ userId }).populate("items.productId");
    if (!cart) {
      res
        .status(200)
        .send({ success: false, message: "No Data found in cart" });
      return;
    }
    res
      .status(200)
      .send({ success: true, message: "Fetched Cart", data: cart });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteCartItems = async (
  req: Request,
  res: Response<APIResponse>
): Promise<void> => {
  try {
    const { productId } = req.params;
    const userId = req.userId;

    if (!userId) {
      res.status(400).send({ success: false, message: "Not authorized!" });
      return;
    }
    const updatedCart = await CartModel.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } },
      { new: true }
    );
    if (!updatedCart) {
      res.status(404).send({ success: false, message: "Cart not found!" });
      return;
    }

    res.status(200).send({
      success: true,
      message: "Item removed from cart successfully",
      data: updatedCart,
    });
  } catch (error:any) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
