import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../components/Title';
import { PiShoppingCartThin } from "react-icons/pi";
import { FaExclamationTriangle } from 'react-icons/fa';

const Orders = ({ minimal = false }) => {
  const { backendUrl, token, currency, navigate } = useContext(ShopContext);
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrdersData = async () => {
    setLoading(true);
    try {
      if (!token) return;

      const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, {
        headers: { token }
      });

      if (response.data.success) {
        const processedOrders = response.data.orders.map(order => ({
          _id: order._id,
          status: order.status,
          paymentMethod: order.paymentMethod,
          dateOrdered: order.dateOrdered,
          amount: order.amount,
          address: order.address,
          items: order.items.map(item => ({
            ...item,
            price: item.price,
            name: item.name,
            imgURL: item.imgURL
          }))
        }));

        setOrdersData(processedOrders.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrdersData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (ordersData.length === 0) {
    return (
      <div className='flex items-center justify-center h-screen text-center text-gray-500'>
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className="relative text-gray-400">
            <PiShoppingCartThin className="w-28 h-28" />
            <FaExclamationTriangle className="absolute w-10 h-10 -top-2 -right-2 bg-white p-1 rounded-full" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-600">
            No Orders Found
          </h2>
          <p className="text-gray-400 max-w-xs">
            Your order history is currently empty. Start shopping to fill it with wonderful items!
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="flex items-center space-x-2 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            Browse Our Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
        <div className='mt-4'>
            {!minimal && <Title title1={'MY'} title2={'ORDERS'} />}
        </div>      
        
        {minimal ? (
        // 👉 MINIMAL VERSION
        <div className="space-y-4">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => navigate('/orders')}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 transition"
              >
                View All Orders
              </button>
            </div>

            {ordersData.map((order) => (
                <div
                  key={order._id}
                  className="cursor-pointer p-4 sm:p-5 rounded-xl shadow border border-gray-200 bg-white hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                    <p className="text-sm text-gray-600 break-words">
                      <span className="font-semibold text-gray-800">Order ID:</span> {order._id}
                    </p>
                    <span
                      className={`w-fit text-xs font-medium px-2 py-1 rounded-full 
                        ${order.status === 'Delivered'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'Out for Delivery'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'}
                      `}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Date:</span>{' '}
                    {new Date(order.dateOrdered).toDateString()}
                  </p>
                </div>
            ))}
        </div>
      ) : (
        // 👉 FULL VERSION
        <div className='mt-2 space-y-8'>
          {ordersData.map(order => (
            <div
              key={order._id}
              className='bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all hover:shadow-lg'
            >
              <div className='flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b border-gray-200'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Order # {order._id}
                  </h3>
                  <div className='flex flex-col sm:flex-row sm:gap-6 mt-1 text-base text-gray-700'>
                    <p>Date: <span className='text-gray-400'>{new Date(order.dateOrdered).toDateString()}</span></p>
                    <p>Payment: <span className='text-gray-400'>{order.paymentMethod}</span></p>
                    <p>Total: <span className='text-gray-400'>{currency} {order.amount}</span></p>
                  </div>
                </div>
                <div className='flex items-center gap-4 mt-3 sm:mt-0'>
                  <div className='flex items-center gap-2'>
                    <div className={`w-2 h-2 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-500' :
                      order.status === 'Out for Delivery' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`} />
                    <p className='text-sm md:text-base'>{order.status}</p>
                  </div>
                  <button
                    onClick={() => location.reload()}
                    className="w-auto px-6 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 rounded-md transition-colors duration-200"
                  >
                    Track Order
                  </button>
                </div>
              </div>

              <div className='space-y-6'>
                {order.items.map((item, index) => (
                  <div key={`${order._id}-${index}`} className='flex flex-col sm:flex-row gap-5 pb-6 last:pb-0 border-b last:border-b-0 border-gray-100'>
                    <img
                      className='w-full h-28 sm:w-20 sm:h-20 object-contain rounded-lg bg-gray-50 p-2 border border-gray-200'
                      src={item.imgURL}
                      alt={item.name || 'Product image'}
                    />
                    <div className='flex-1'>
                      <h4 className='text-base font-medium text-gray-900'>
                        {item.name || 'Unnamed Product'}
                      </h4>
                      <div className='flex items-center gap-2 sm:gap-4 mt-2 text-base font-semibold text-gray-600'>
                        <p>{currency} {item.price}</p>
                        <span>•</span>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;