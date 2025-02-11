"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middleware/authentication");
const ProductController_1 = require("../controllers/ProductController");
const router = express_1.default.Router();
router.get("/", authentication_1.authentication, ProductController_1.getAllProducts);
router.post("/addtocart", authentication_1.authentication, ProductController_1.addToCart);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map