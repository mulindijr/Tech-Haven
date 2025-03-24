import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing orders using Cash On Delivery method
const placeOrder = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body;
        
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment: false,
            dateOrdered: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Clear the cart after placing the order
        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.status(201).json({success: true, message: "Order Placed"})
        
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({success:false, message: error.message || "Internal Server Error" })        
    }
}

// Placing orders using Stripe method
const placeOrderStripe = async (req, res) => {

}

// Placing orders using Razorpay method
const placeOrderRazorpay = async (req, res) => {

}

// Placing orders using Mpesa method
const placeOrderMpesa = async (req, res) => {

}

// All Orders for Admin Panel
const allOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({});
        res.status(200).json({success:true, orders})
        
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({success:false, message: error.message || "Internal Server Error" })
    }
    
}

//User Order Data for frontend
const userOrders = async (req, res) => {

    try {

        const {userId} = req.body;

        const orders = await orderModel.find({userId});
        res.status(200).json({success:true, orders})
        
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({success:false, message: error.message || "Internal Server Error" })     
    }
    
}

// Update Order Status from admin panel
const updateOrderStatus = async (req, res) => {
    
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, placeOrderMpesa, allOrders, userOrders, updateOrderStatus }