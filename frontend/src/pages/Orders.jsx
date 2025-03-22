import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios'
import { toast } from 'react-toastify'
import { PiShoppingCartThin } from "react-icons/pi";
import { FaExclamationTriangle } from 'react-icons/fa';

const Orders = () => {

    const {backendUrl, token, currency, navigate } = useContext(ShopContext);
    const [ordersData, setOrdersData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetching Orders
    const loadOrdersData = async () => {
        setLoading(true);
        
        try {
            if (!token) {
                return null
            }

            const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers: {token}})
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
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadOrdersData()
    }, [token])

    return (
        <div className='pt-4 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
            <Title title1={'MY'} title2={'ORDERS'} />

            {loading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
                </div>
            ):( ordersData?.length > 0 ? (
                <div className='mt-6 space-y-8'>
                    {ordersData.map((order) => (
                        <div key={order._id} className='bg-white rounded-xl shadow-md sm:shadow-md border border-gray-100 p-6 transition-all hover:shadow-lg'>
                            {/* Order Header */}
                            <div className='flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b border-gray-200'>
                                <div>
                                    <h3 className='text-lg font-semibold text-gray-900'>
                                        Order # {order._id}
                                    </h3>
                                    <div className='flex flex-col sm:flex-row sm:gap-6 mt-1 text-base text-gray-700'>
                                        <p>
                                            Date: {' '}
                                            <span className='text-gray-400'>
                                                {new Date(order.dateOrdered).toDateString()}
                                            </span>
                                        </p>
                                        <p>
                                            Payment: {' '}
                                            <span className='text-gray-400'>
                                                {order.paymentMethod}
                                            </span>
                                        </p>
                                        <p>
                                            Total: {' '}
                                            <span className='text-gray-400'>
                                                {currency} {order.amount}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-4 mt-3 sm:mt-0'>
                                    <div className='flex items-center gap-2'>
                                        <div className={`w-2 h-2 rounded-full ${
                                            order.status === 'Delivered' ? 'bg-green-500' :
                                            order.status === 'Out for Delivery' ? 'bg-blue-500' :
                                            'bg-yellow-500'
                                        }`} />
                                        <p className='text-sm md:text-base'>{order.status}</p>
                                    </div>
                                    <button 
                                        onClick={() => loadOrdersData()}
                                        className="w-auto px-6 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 rounded-md transition-colors duration-200"
                                    >
                                        Track Order
                                    </button>
                                </div>
                            </div>

                            {/* Products List */}
                            <div className='space-y-6'>
                                {order.items?.map((item, index) => (
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
                
            ) : (
                <div className='flex items-center justify-center h-screen text-center text-gray-500'>
                    <div className="flex flex-col items-center justify-center text-center gap-4">
                        <div className="relative text-gray-400">
                            <PiShoppingCartThin className="w-28 h-28" />
                            <FaExclamationTriangle className="absolute w-10 h-10 -top-2 -right-2 bg-white p-1 rounded-full"/>
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
            ))}
        </div>
    );
}

export default Orders