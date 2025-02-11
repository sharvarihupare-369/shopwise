import mongoose, { Document, Schema } from "mongoose";

interface OrderItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

interface Order extends Document {
  userId: mongoose.Types.ObjectId;
  items: OrderItem[];
  totalPrice: number;
  shippingAddress: string;
  paymentStatus: "Pending" | "Paid" | "Failed";
  orderStatus: "Pending" | "Processing" | "Shipped" | "Delivered";
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema: Schema<Order> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    totalPrice: { type: Number, required: true, min: 0 },
    shippingAddress: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<Order>("order", orderSchema);

export default OrderModel;
