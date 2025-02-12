import express from "express";
import { authentication } from "../middleware/authentication";
import { addToCart, getAllProducts, getCart } from "../controllers/ProductController";

const router = express.Router();

router.get("/", authentication, getAllProducts);
router.post("/addtocart", authentication, addToCart);
router.get("/getcart", authentication, getCart);

export default router;
