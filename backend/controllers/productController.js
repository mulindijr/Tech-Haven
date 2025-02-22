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

    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
        
    } catch (error) {
        console.error(error);
        res.json({ success: false, message:error.message });        
    }

}


// Function for removing a product
const removeProduct = async (req, res) => {

    try {

        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product removed successfully" });
        
    } catch (error) {
        console.error(error);
        res.json({ success: false, message:error.message });        
    }
}

//Function for updating a product
const updateProduct = async (req, res) => {
    try {
        const {id, name, category, brand, price, rating, description} = req.body;
        
        if(!id) {
            return res.status(400).json({ success:false, message:'Product Id is required'})
        }

        const product = await productModel.findById(id);
        if(!product){
            return res.status(404).json({ success:false, message:'Product not found'})
        }

        //Update product details
        product.name = name || product.name;
        product.category = category || product.category;
        product.brand = brand || product.brand;
        product.price = price || product.price;
        product.rating = rating || product.rating;
        product.description = description || product.description;

        //If a new image is uploaded, update cloudinary image
        if(req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "products",
                use_filename: true,
                unique_filename: false,
            });
            product.imgURL = result.secure_url;
        }
        await product.save();
        res.json({ success:true, message:'Product updated successfully'});
    }catch (error) {
        console.error(error);
        res.json({ success:false, message:error.message });
    }
}

// Function for getting a single product
const singleProduct = async (req, res) => {

    try {

        const {productId} = req.body;

        const product = await productModel.findById(productId);

        res.json({ success: true, product });
        
    } catch (error) {
        console.error(error);
        res.json({ success: false, message:error.message });        
    }

}

export { addProduct, listProducts, removeProduct, updateProduct, singleProduct };