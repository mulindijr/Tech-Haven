import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";

const TopProducts = ({ token }) => {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [criteria, setCriteria] = useState("quantity");

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {

        const response = await axios.post( backendUrl + "/api/admin/top-products", { criteria }, { headers: { token } } );
        setTopProducts(response.data.topProducts);

      } catch (error) {

        console.error("Error fetching top products:", error);
        toast.error("Error fetching top products");

      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, [criteria, token]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold sm:hidden mb-4">
        Top Products by {criteria === "quantity" ? "Quantity" : "Revenue"}
      </h3>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold hidden sm:inline" >
          Top Products by {criteria === "quantity" ? "Quantity" : "Revenue"}
        </h3>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setCriteria("quantity")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              criteria === "quantity"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Quantity
          </button>
          <button
            onClick={() => setCriteria("revenue")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              criteria === "revenue"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Revenue
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {topProducts.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <p className="font-medium text-gray-800 truncate max-w-[120px] sm:max-w-[300px]">
                    {product.name}
                  </p>
                  <div className="absolute z-10 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded mt-1">
                    {product.name}
                  </div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600">
                {criteria === "quantity"
                  ? `${product.totalQuantity} sales`
                  : `${currency} ${product.totalRevenue?.toFixed(2) || "0.00"}`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopProducts;