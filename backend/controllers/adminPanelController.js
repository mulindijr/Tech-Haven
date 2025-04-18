import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// This function retrieves dashboard statistics including total revenue, total orders, and total customers
const getDashboardStats = async (req, res) => {
  try {
    const totalRevenue = await orderModel.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    console.log("Total Revenue Aggregation Result:", totalRevenue);

    const totalOrders = await orderModel.countDocuments();
    const totalCustomers = await userModel.countDocuments();

    res.status(200).json({
      success: true,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalOrders,
      totalCustomers
    });

  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
};

// This function retrieves the total number of users
const getCustomers = async (req, res) => {

  try {
    
    const customers = await userModel.find({}, {
      _id: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
      profilePic: 1,
      createdAt: 1,
      'address.city': 1,
      'address.country': 1,
      'address.phone': 1
    });

    res.status(200).json({ success: true, count: customers.length, customers });

  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ success: false, message: "Failed to fetch customers" });
  }

}

// Delete Order from admin panel
const deleteOrder = async (req, res) => {

  try {

    const {orderId} = req.body;

    const deletedOrder = await orderModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({success:false, message: 'Order Not Found'})
    }

    res.status(200).json({success:true, message: 'Order Deleted Successfully'})

  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({success:false, message: error.message || "Internal Server Error" })
  }
  
}

// Get Recent Orders
const getRecentOrders = async (req, res) => {

  try {

    const recentOrders = await orderModel.find({}).sort({ dateOrdered: -1 }).limit(2).populate('userId', 'firstName lastName email');

    res.status(200).json({ success: true, orders: recentOrders });

  } catch (error) {
    console.error("Error fetching recent orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch recent orders" });
  }

};

export { getDashboardStats, getCustomers, deleteOrder, getRecentOrders };