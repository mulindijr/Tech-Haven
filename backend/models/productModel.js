import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  imgURL: { type: String, required: true },
  brand: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
});

const productModel = mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;