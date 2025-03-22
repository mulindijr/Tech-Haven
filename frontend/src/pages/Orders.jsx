import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {

    const {backendUrl, token, currency } = useContext(ShopContext);
    const [ordersData, setOrdersData] = useState([]);

    // Fetching Orders
    const loadOrdersData = async () => {
        
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
        }
    }

    useEffect(() => {
        loadOrdersData()
    }, [token])

  return (
    <div className='pt-4'>

        <Title title1={'MY'} title2={'ORDERS'} />

        <div>
            {orderData.map((item, index) => (
                <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:gap-20'>
                    
                    <div className='md:w-1/2'>
                        <div className='flex items-start gap-6 text-sm'>
                            <img className='w-16 sm:w-20' src={item.imgURL} alt={item.name} />
                            <div>
                                <p className='text-base font-medium'>{item.name}</p>
                                <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                    <p className='text-lg'>{currency} {item.price}</p>
                                    <p>Quantity:1</p>
                                </div>
                                <p className='mt-2'>
                                    Date: <span className='text-gray-400'>12/9/2024</span>
                                </p>
                            </div>
                        </div> 
                    </div>                 
                    
                    <div className='flex gap-28 sm:gap-48 pt-4 sm:pt-0'>
                        <div className='flex items-center gap-2'>
                            <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                            <p className='text-sm md:text-base'>Ready To Ship</p>
                        </div>
                        <button className="w-auto px-6 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 rounded-md transition-colors duration-200">Track Order</button>
                    </div>                    
                </div>
            ))}
        </div>

    </div>
  )
}

export default Orders