"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middleware/authentication");
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
router.post("/", authentication_1.authentication, orderController_1.createOrder);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map