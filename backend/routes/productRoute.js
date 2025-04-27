import express from "express";
import { addProduct, listProducts, removeProduct, updateProduct, singleProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post("/add", adminAuth, upload.single("image"), addProduct);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.post("/single", singleProduct);
productRouter.get("/list", listProducts);
productRouter.put("/update", adminAuth, upload.single("image"), updateProduct);

export default productRouter;