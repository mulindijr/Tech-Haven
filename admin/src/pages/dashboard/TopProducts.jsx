import React from "react";

const TopProducts = () => {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Top Products</h3>
        <div className="space-y-4">
          {['Gaming Laptop', 'Wireless Mouse', 'Mechanical Keyboard'].map((product) => (
            <div key={product} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
              <p className="font-medium">{product}</p>
              <span className="text-sm text-gray-500">45 sales</span>
            </div>
          ))}
        </div>
      </div>
    );
};
  
export default TopProducts;