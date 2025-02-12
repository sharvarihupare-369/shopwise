import type { Request, Response } from "express";
import { APIResponse } from "../utils/types";
import CartModel from "../models/CartModel";
import ProductModel from "../models/ProductModel";
import OrderModel from "../models/OrderModel";

export const createOrder = async (
  req: Request,
  res: Response<APIResponse>
): Promise<void> => {
  try {
    const { shippingAddress } = req.body;
    const userId = req.userId;
    const cart = await CartModel.findOne({ userId }).populate(
      "items.productId"
    );
    const orderItems = [];
    let totalPrice = 0;
    if (!cart || cart.items.length === 0) {
      res.status(400).send({ success: false, message: "Cart is empty!" });
    }
    if (!cart || !cart.items) {
      res.status(400).send({ success: false, message: "Cart is empty!" });
      return;
    }
    for (const item of cart.items) {
      const product = await ProductModel.findById(item.productId);
      if (
        !product ||
        product.stock === undefined ||
        product.stock < item.quantity
      ) {
        res.status(400).send({
          success: false,
          message: `Product ${product?.title} is out of stock`,
        });
      }

      const price = product?.price;
      orderItems.push({
        productId: product?._id,
        quantity: item.quantity,
        price: price,
      });

      if (product) {
        if (price !== undefined) {
          totalPrice += item.quantity * price;
        }
      }
    }

    const order = await OrderModel.create({
      userId,
      items: orderItems,
      totalPrice,
      shippingAddress,
      paymentStatus: "Pending",
      orderStatus: "Pending",
    });
    await CartModel.findOneAndUpdate({ userId }, { items: [] });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
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
