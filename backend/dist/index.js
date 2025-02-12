"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const db_1 = __importDefault(require("./config/db"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Welcome to Base Rouet!");
});
app.use("/users", userRoutes_1.default);
app.use("/products", productRoutes_1.default);
app.listen(PORT, async () => {
    try {
        await db_1.default;
        console.log("Connected to DB");
    }
    catch (error) {
        console.log("Something went wrong with the database connection");
    }
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map