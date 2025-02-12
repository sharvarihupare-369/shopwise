import express from "express";
import { authentication } from "../middleware/authentication";
import {
  addToCart,
  deleteCartItems,
  getAllProducts,
  getCart,
} from "../controllers/ProductController";

const router = express.Router();

router.get("/", authentication, getAllProducts);
router.post("/addtocart", authentication, addToCart);
router.get("/getcart", authentication, getCart);
router.delete("/deleteItem/:productId", authentication, deleteCartItems);

export default router;
