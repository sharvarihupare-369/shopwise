"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = exports.getAllProducts = void 0;
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const CartModel_1 = __importDefault(require("../models/CartModel"));
const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel_1.default.find();
        res.status(200).send({
            success: true,
            message: "Fetched All the Products",
            data: products,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
exports.getAllProducts = getAllProducts;
const addToCart = async (req, res) => {
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
        const product = await ProductModel_1.default.findById(productId);
        if (!product) {
            res.status(400).send({ success: false, message: "No Products Found" });
            return;
        }
        let cart = await CartModel_1.default.findOne({ userId });
        if (!cart) {
            cart = new CartModel_1.default({
                userId,
                items: [{ productId, quantity: quantity || 1 }],
            });
        }
        else {
            const itemsInd = cart.items.findIndex((el) => el.productId.toString() === productId);
            if (itemsInd > -1) {
                cart.items[itemsInd].quantity += quantity || 1;
            }
            else {
                cart.items.push({ productId: productId, quantity: quantity || 1 });
            }
        }
        await cart.save();
        res
            .status(200)
            .send({ success: true, message: "Product added to cart", data: cart });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
exports.addToCart = addToCart;
//# sourceMappingURL=ProductController.js.map