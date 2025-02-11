import mongoose, { Document, Schema } from "mongoose";

interface CartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

interface Cart extends Document {
  userId: mongoose.Types.ObjectId;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema: Schema<Cart> = new Schema(
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
        quantity: { type: Number, required: true, default: 1, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

const CartModel = mongoose.model<Cart>("cart", cartSchema);

export default CartModel;
