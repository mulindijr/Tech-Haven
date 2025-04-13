import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Global variables
const currency = 'kes'
const deliveryCharge = 200

// Gateway Initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing orders using Cash On Delivery method
const placeOrder = async (req, res) => {

    try {

        const userId = req.user.id;
        const { items, amount, address } = req.body;
        
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

    try {

        const userId = req.user.id;
        const { items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Stripe',
            payment: false,
            dateOrdered: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.status(201).json({success: true, session_url: session.url});

    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({success:false, message: error.message || "Internal Server Error" })
    }

}

// Verify Stripe Payment
const verifyStripePayment = async (req, res) => {

    try {

        const userId = req.user.id;
        const { orderId, success } = req.body;

        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}})

            res.status(200).json({success: true})
            
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.status(200).json({success: false});           
        }

    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({success:false, message: error.message || "Internal Server Error" })
    }

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

        const userId = req.user.id;

        const orders = await orderModel.find({userId});
        res.status(200).json({success:true, orders})
        
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({success:false, message: error.message || "Internal Server Error" })     
    }
    
}

// Update Order Status from admin panel
const updateOrderStatus = async (req, res) => {

    try {

        const {orderId, status} = req.body;

        const orders = await orderModel.findByIdAndUpdate(orderId, { status });
        res.status(200).json({success:true, message: 'Status Updated'})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message: error.message || "Internal Server Error" }) 
    }
    
}

export { placeOrder, placeOrderStripe, placeOrderMpesa, allOrders, userOrders, updateOrderStatus, verifyStripePayment }