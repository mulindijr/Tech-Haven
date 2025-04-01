import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

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

export { getDashboardStats };