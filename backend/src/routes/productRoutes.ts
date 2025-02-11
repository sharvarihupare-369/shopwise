import express from "express";
import { authentication } from "../middleware/authentication";
import { addToCart, getAllProducts } from "../controllers/ProductController";

const router = express.Router();

router.get("/", authentication, getAllProducts);
router.post("/addtocart", authentication, addToCart);

export default router;
