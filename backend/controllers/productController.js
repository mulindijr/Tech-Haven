import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function for adding a new product
const addProduct = async (req, res) => {
    try {
        const { name, brand, price, description, category, rating } = req.body;
        const image = req.file.filename;

        // Validate required fields
        if (!name || !brand || !price || !description || !category || !rating) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "products", // Folder in Cloudinary where images will be stored
            use_filename: true,
            unique_filename: false,
        });
        
        const productData = {
            name,
            brand,
            price,
            description,
            category,
            rating,
            imgURL: result.secure_url,
            date: Date.now(),
        };
        console.log(productData);

        // Save product to database 
        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product added successfully" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message:error.message });
    }
};

// Function for getting all products
const listProducts = async (req, res) => {

}


// Function for removing a product
const removeProduct = async (req, res) => {

}


// Function for getting a single product
const singleProduct = async (req, res) => {

}

export { addProduct, listProducts, removeProduct, singleProduct };