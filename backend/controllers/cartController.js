import userModel from "../models/userModel.js";

// Add Products To User Cart
const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { itemId } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.status(200).json({ success: true, message: "Product Added To Cart" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};

// Update User Cart
const updateCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { itemId, quantity } = req.body;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (quantity > 0) {
            cartData[itemId] = quantity;
        } else {
            delete cartData[itemId];
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.status(200).json({ success: true, message: "Cart Updated Successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};

// Get User Cart Data
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        res.status(200).json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
};

export { addToCart, updateCart, getCart };