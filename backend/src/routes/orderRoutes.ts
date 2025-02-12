import express from "express";
import { authentication } from "../middleware/authentication";
import { createOrder } from "../controllers/orderController";

const router = express.Router();

router.post("/", authentication, createOrder);

export default router;
