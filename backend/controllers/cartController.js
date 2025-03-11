import userModel from "../models/userModel";


// Add Products To User Cart
const addToCart = async (req, res)=> {

    try {

        const { userId, itemId } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        if (cartData[itemId]) {
            cartData[itemId] += 1
        } else {
            cartData[itemId] =1
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.status(200).json({message: "Product Added To Cart"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message || "Internal Server Error"});        
    }   
}

// Update User Cart
const updateCart = async (req, res)=> {
    
}

// Get User Cart Data
const getCart = async (req, res)=> {
    
}

export { addToCart, updateCart, getCart }