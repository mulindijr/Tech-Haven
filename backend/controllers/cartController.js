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

// Merge guest cart with authenticated user cart
const mergeCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { guestCart } = req.body;

        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // Start with server‐side cart or empty
        const merged = { ...(user.cartData || {}) };

        // Add guestCart quantities
        for (const [itemId, qty] of Object.entries(guestCart)) {
          merged[itemId] = (merged[itemId] || 0) + qty;
        }

        // Update user doc
        await userModel.findByIdAndUpdate(userId, { cartData: merged });
        return res.status(200).json({ success: true, cartData: merged });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getCart, mergeCart };