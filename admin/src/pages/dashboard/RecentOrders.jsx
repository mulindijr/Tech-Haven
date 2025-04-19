import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../../App";

const RecentOrders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await axios.post(
          backendUrl + "/api/admin/recent-orders",
          {},
          { headers: { token } }
        );

        console.log("Recent Orders Response:", response.data);
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching recent orders:", error);
        toast.error("Error fetching recent orders");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, [token]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full">
      <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>

      {loading ? (
        <p className="flex items-center justify-center h-full w-full text-xl" >Loading recent orders...</p>
      ) : orders.length === 0 ? (
        <p className="flex items-center justify-center h-full w-full text-xl" >No recent orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded"
            >
              <div>
                <p className="font-medium">Order #{order._id}</p>
                <p className="text-sm text-gray-500">
                  {order.address?.firstName} {order.address?.lastName}
                </p>
              </div>
              <span className="text-sm text-gray-700 font-semibold">
                KES {order.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentOrders;