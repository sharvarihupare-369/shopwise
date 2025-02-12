"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const CartModel_1 = __importDefault(require("../models/CartModel"));
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
const createOrder = async (req, res) => {
    try {
        const { shippingAddress } = req.body;
        const userId = req.userId;
        const cart = await CartModel_1.default.findOne({ userId }).populate("items.productId");
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
            const product = await ProductModel_1.default.findById(item.productId);
            if (!product ||
                product.stock === undefined ||
                product.stock < item.quantity) {
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
        const order = await OrderModel_1.default.create({
            userId,
            items: orderItems,
            totalPrice,
            shippingAddress,
            paymentStatus: "Pending",
            orderStatus: "Pending",
        });
        await CartModel_1.default.findOneAndUpdate({ userId }, { items: [] });
        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: order,
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
exports.createOrder = createOrder;
//# sourceMappingURL=orderController.js.map