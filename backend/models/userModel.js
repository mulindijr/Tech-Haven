import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zipcode: { type: String, required: false },
    country: { type: String, required: false },
    phone: { type: String, required: false },
    isDefault: { type: Boolean, default: false },
  }, { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    profilePic: { type: String, default: "" },
    address: { type: addressSchema, required: false, default: {}, },
  }, { minimize: false, timestamps: true }
);

const userModel = mongoose.models.User || mongoose.model('User', userSchema);

export default userModel;