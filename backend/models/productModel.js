import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema({
  imgURL: { type: String, required: true },
  brand: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  date: { type: Number, required: true },
  slug: { type: String, unique: true },
});

// Pre-save hook to generate unique slug
productSchema.pre('save', async function (next) {
  if (!this.isModified('name')) return next();

  const baseSlug = slugify(this.name, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  // Check if slug already exists, if yes, add "-1", "-2", etc.
  while (await mongoose.models.Product.findOne({ slug })) {
    slug = `${baseSlug}-${counter++}`;
  }

  this.slug = slug;
  next();
});

const productModel = mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;