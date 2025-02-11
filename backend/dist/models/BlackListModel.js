"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const blackListSchema = new mongoose_1.default.Schema({
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
const BlackListModel = mongoose_1.default.model("blacklist", blackListSchema);
exports.default = BlackListModel;
//# sourceMappingURL=BlackListModel.js.map