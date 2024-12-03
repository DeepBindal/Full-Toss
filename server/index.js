import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDB } from "./utils/db.js";
// import { IPL_PRODUCTS } from './utils/sampleData.js';
// import Product from './models/product.js';
const app = express();

const port = 3000;

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
await connectToDB();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/s", userRouter);
app.use("/orders", orderRouter);
app.use("/products", productRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
