import mongoose, { Document, Schema } from "mongoose";

interface User extends Document {
  fullName: string;
  email: string;
  password: string;
}

const userSchema: Schema<User> = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<User>("user", userSchema);

export default UserModel;
