import mongoose, { Document, Schema } from "mongoose";

interface Product extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  stock?: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema<Product> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<Product>("product", productSchema);

export default ProductModel;
