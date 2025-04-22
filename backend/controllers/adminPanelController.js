import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// This function retrieves dashboard statistics including total revenue, total orders, and total customers
const getDashboardStats = async (req, res) => {
  try {
    const totalRevenue = await orderModel.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

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

// Delete Customer and Their Orders from admin panel
const deleteCustomer = async (req, res) => {
  try {
    const { customerId } = req.body;

    // Delete the customer
    const deletedCustomer = await userModel.findByIdAndDelete(customerId);
    if (!deletedCustomer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    // Delete all orders associated with the customer
    await orderModel.deleteMany({ userId: customerId });

    res.status(200).json({ success: true, message: "Customer and their orders deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ success: false, message: "Failed to delete customer" });
  }
};

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

    const recentOrders = await orderModel.find({}).sort({ dateOrdered: -1 }).limit(5).populate('userId', 'firstName lastName email');

    res.status(200).json({ success: true, orders: recentOrders });

  } catch (error) {
    console.error("Error fetching recent orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch recent orders" });
  }

};

// Get Top Products By Quantity or Revenue
const getTopProducts = async (req, res) => {
  const sortBy = req.query.sortBy || 'quantity'; // default to quantity

  try {
    
    const topProducts = await orderModel.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items._id",
          name: { $first: "$items.name" },
          imgURL: { $first: "$items.imgURL" },
          totalQuantity: { $sum: "$items.quantity" },
          totalRevenue: { $sum: { $multiply: ["$items.quantity", { $toInt: "$items.price" }] } }
        }
      },
      {
        $sort: sortBy === 'revenue'
          ? { totalRevenue: -1 }
          : { totalQuantity: -1 }
      },
      { $limit: 5 }
    ]);

    res.status(200).json({ success: true, topProducts });

  } catch (error) {
    console.error("Error fetching top products:", error);
    res.status(500).json({ success: false, message: "Failed to fetch top products" });
  }
};

// Get Sales Chart Data
// This function retrieves sales data for chart representation
const getSalesChartData = async (req, res) => {
  try {
    const { period = "day" } = req.query;

    // Match pattern for date grouping
    let dateFormat;
    switch (period) {
      case "month":
        dateFormat = "%Y-%m";
        break;
      case "week":
        dateFormat = "%Y-%U"; // U = week number
        break;
      default:
        dateFormat = "%Y-%m-%d"; // Default is day
    }

    const chartData = await orderModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: dateFormat,
              date: { $toDate: "$dateOrdered" }
            }
          },
          totalRevenue: { $sum: "$amount" },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({ success: true, chartData });

  } catch (error) {
    console.error("Error generating sales chart data:", error);
    res.status(500).json({ success: false, message: "Failed to generate chart data" });
  }
};

export { getDashboardStats, getCustomers, deleteOrder, getRecentOrders, getTopProducts, getSalesChartData, deleteCustomer };