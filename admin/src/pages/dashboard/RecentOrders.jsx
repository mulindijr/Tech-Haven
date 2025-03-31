import React from "react";

const RecentOrders = () => {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
              <div>
                <p className="font-medium">Order #100{item}</p>
                <p className="text-sm text-gray-500">Customer Name</p>
              </div>
              <span className="text-sm text-gray-500">$15{9 * item}</span>
            </div>
          ))}
        </div>
      </div>
    );
};
  
export default RecentOrders;
  