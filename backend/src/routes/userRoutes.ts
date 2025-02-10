import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/UserController";
import { validation } from "../middleware/validation";
import { authentication } from "../middleware/authentication";


const router = express.Router();

router.post("/register",validation, registerUser);
router.post("/login", loginUser);
router.get("/logout",authentication, logoutUser);

export default router;
