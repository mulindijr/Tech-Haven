import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../../App";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
      <h3 className="text-lg font-semibold mb-6">Recent Orders</h3>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <p className="flex items-center justify-center h-32 text-xl" >No recent orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded"
            >
              <div>
                <p className="font-medium">
                  Order #
                  <span className="sm:hidden">{order._id.slice(-6)}</span>
                  <span className="hidden sm:inline">{order._id}</span>
                </p>
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