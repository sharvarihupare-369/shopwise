import mongoose from "mongoose";

const blackListSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const BlackListModel = mongoose.model("blacklist", blackListSchema);

export default BlackListModel;
