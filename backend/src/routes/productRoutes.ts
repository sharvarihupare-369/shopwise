import express from "express";
import { authentication } from "../middleware/authentication";
import { getAllProducts } from "../controllers/ProductController";

const router = express.Router();

router.get("/", authentication, getAllProducts);

export default router;
