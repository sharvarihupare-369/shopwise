"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const ProductModel_1 = __importDefault(require("./models/ProductModel"));
dotenv_1.default.config();
const MONGO_URL = process.env.MONGO_URL;
const seedProducts = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URL);
        console.log("connected to DB");
        const products = [
            {
                title: "Apple iPhone 15 Pro",
                description: "Apple iPhone 15 Pro with A17 Pro chip and titanium body.",
                price: 999.99,
                category: "Electronics",
                stock: 20,
                imageUrl: "https://img-prd-pim.poorvika.com/cdn-cgi/image/width=1600,height=1600,quality=75/product/Apple-iphone-15-pro-max-black-titanium-256gb-Front-Back-View-Image.png",
            },
            {
                title: "Samsung Galaxy S23 Ultra",
                description: "Samsung's flagship phone with a 200MP camera and S-Pen.",
                price: 1199.99,
                category: "Electronics",
                stock: 25,
                imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/ae/2302/gallery/ae-galaxy-s23-s918-sm-s918bliqmea-thumb-534838486",
            },
            {
                title: "Sony WH-1000XM5 Headphones",
                description: "Industry-leading noise cancellation wireless headphones.",
                price: 399.99,
                category: "Accessories",
                stock: 15,
                imageUrl: "https://www.sony.co.in/image/4b360d8de9876d57b5a9c1671547f24b?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
            },
            {
                title: "Logitech MX Master 3S Mouse",
                description: "Ergonomic wireless mouse with MagSpeed scrolling.",
                price: 99.99,
                category: "Accessories",
                stock: 40,
                imageUrl: "https://www.sony.co.in/image/6145c1d32e6ac8e63a46c912dc33c5bb?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
            },
            {
                title: "Apple MacBook Air M2",
                description: "Ultra-thin MacBook Air with the powerful M2 chip.",
                price: 1249.99,
                category: "Electronics",
                stock: 10,
                imageUrl: "https://www.thestreet.com/.image/t_share/MTkwODg5Mzk3NjExMzQxNDk0/1-apple-macbook-air-m2-review.jpg",
            },
            {
                title: "Asus ROG Zephyrus G14",
                description: "High-performance gaming laptop with Ryzen 9 and RTX 4060.",
                price: 1799.99,
                category: "Electronics",
                stock: 12,
                imageUrl: "https://dlcdnwebimgs.asus.com/gain/687BBF01-F4D3-46CF-838C-FA3366078A94",
            },
            {
                title: "Fitbit Charge 6",
                description: "Advanced fitness tracker with heart rate monitoring.",
                price: 149.99,
                category: "Wearables",
                stock: 30,
                imageUrl: "https://assets.mofoprod.net/network/images/Fitbit_Charge_6.original.jpg",
            },
            {
                title: "Samsung 55-inch QLED TV",
                description: "4K UHD Smart TV with Quantum HDR.",
                price: 699.99,
                category: "Electronics",
                stock: 8,
                imageUrl: "https://m.media-amazon.com/images/I/81WuvVxAK8L.jpg",
            },
            {
                title: "Nike Air Max 270",
                description: "Comfortable and stylish running shoes.",
                price: 129.99,
                category: "Fashion",
                stock: 50,
                imageUrl: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/ac5677ec-5ab7-4888-80f0-7fb390a2a324/NIKE+AIR+MAX+270+GS.png",
            },
            {
                title: "Adidas Ultraboost 22",
                description: "High-performance running shoes with Boost cushioning.",
                price: 149.99,
                category: "Fashion",
                stock: 40,
                imageUrl: "https://assets.adidas.com/images/w_600,f_auto,q_auto/77347182cf48430ebb7aae1400402b3b_9366/Ultraboost_22_Shoes_White_GX5573_01_standard.jpg",
            },
            {
                title: "The Alchemist - Book",
                description: "Best-selling book by Paulo Coelho.",
                price: 9.99,
                category: "Books",
                stock: 100,
                imageUrl: "https://bookbins.in/wp-content/uploads/2024/04/The-Alchemist-Paulo-Coelho-Buy-Online-Bookbins-1.png",
            },
            {
                title: "Atomic Habits - Book",
                description: "Self-improvement book by James Clear.",
                price: 14.99,
                category: "Books",
                stock: 100,
                imageUrl: "https://gyaanstore.com/cdn/shop/files/230_2581bdfc-eb21-4ecd-b310-4f79a6f8de88.png?v=1701690380&width=1445",
            },
            {
                title: "Dyson V11 Vacuum Cleaner",
                description: "Powerful cordless vacuum cleaner.",
                price: 599.99,
                category: "Home Appliances",
                stock: 20,
                imageUrl: "https://rukminim2.flixcart.com/image/850/1000/kk8mcnk0/vacuum-cleaner/q/6/d/v11-absolute-pro-dyson-original-imafzmhydfxzqvnz.jpeg?q=20&crop=false",
            },
            {
                title: "Bose SoundLink Revolve+",
                description: "360-degree portable Bluetooth speaker.",
                price: 299.99,
                category: "Electronics",
                stock: 15,
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPGzkZi_w6viaysztuyKG228huR37Sh8WYUw&s",
            },
            {
                title: "Amazon Echo Dot 5th Gen",
                description: "Smart speaker with Alexa.",
                price: 49.99,
                category: "Electronics",
                stock: 25,
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdW_LVo7LL6902_xq_iHFeipC8B5-uK9dI8Q&s",
            },
            {
                title: "JBL Flip 6 Speaker",
                description: "Waterproof portable Bluetooth speaker.",
                price: 129.99,
                category: "Accessories",
                stock: 30,
                imageUrl: "https://tekshanghai.com/wp-content/uploads/2022/03/JBL-Flip-6-Portable-Bluetooth-Speaker_7.png",
            },
            {
                title: "Dell Ultrasharp 27 Monitor",
                description: "4K UHD IPS Monitor with color accuracy.",
                price: 499.99,
                category: "Electronics",
                stock: 10,
                imageUrl: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/u-series/u2723qe/media-gallery/monitor-u2723qe-gallery-2.psd?fmt=pjpg&pscan=auto&scl=1&wid=4002&hei=3419&qlt=100,1&resMode=sharp2&size=4002,3419&chrss=full&imwidth=5000",
            },
            {
                title: "GoPro HERO11 Black",
                description: "Action camera with 5.3K video and stabilization.",
                price: 499.99,
                category: "Electronics",
                stock: 15,
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS5Yyhtr8gwFj2Su27qy3p-1yFTlwtpKDLgg&s",
            },
            {
                title: "Xiaomi Mi Band 7",
                description: "Fitness band with SpO2 monitoring.",
                price: 49.99,
                category: "Wearables",
                stock: 50,
                imageUrl: "https://i02.appmifile.com/bg_m.jpg",
            },
            {
                title: "Philips Hue Smart Bulb",
                description: "Smart LED bulb with voice control.",
                price: 39.99,
                category: "Home Appliances",
                stock: 35,
                imageUrl: "https://www.assets.signify.com/is/image/Signify/8719514291218-929002468901-Hue_WCA-A60-B22-on-TRN",
            },
        ];
        await ProductModel_1.default.deleteMany({});
        console.log("remove product");
        await ProductModel_1.default.insertMany(products);
        console.log("DB seeded successfully");
        mongoose_1.default.connection.close();
    }
    catch (error) {
        console.log(error);
        mongoose_1.default.connection.close();
    }
};
seedProducts();
//# sourceMappingURL=seed.js.map