import { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl, currency} from '../App'
import { toast } from 'react-toastify'
import { BiPackage } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";

const Orders = ({token}) => {

  const [orders, setOrders] = useState([]);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const fetchAllOrders = async () => {

    if (!token) {
      return null;      
    }

    try {

      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: {token} })

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      toast.error(error.message)      
    }

  }  

  const statusHandler = async (event, orderId) => {

    try {

      const response = await axios.post(backendUrl + '/api/order/status', {orderId, status:event.target.value}, {headers: {token}})
      if (response.data.success) {
        await fetchAllOrders();        
      }

    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }

  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div>
      <h1>Orders</h1>
      <div>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 ' key={index}>
              <BiPackage size={30} color="gray" className='w-12'/>
              <div>
                <div>
                  {
                    order.items.map((item, index) => {
                      if (index===order.items.length - 1) {
                        return <p className='py-0.5' key={index}> {item.name} X {item.quantity} </p>
                      } else {
                        return <p className='py-0.5' key={index}> {item.name} X {item.quantity}, </p>
                      }
                    })
                  }
                </div>
                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p> {order.address.street + ","} </p>
                  <p> {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode} </p>
                </div>
                <p> {order.address.phone} </p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items : {order.items.length} </p>
                <p className='mt-3'>Method : {order.paymentMethod} </p>
                <p>Payment : {order.payment ? 'Done' : 'Pending'}  </p>
                <p>Date : {new Date (order.dateOrdered).toLocaleDateString()} </p>
              </div>
              <p className='text-sm sm:text-[15px]'> {currency} {order.amount} </p>
              <div className='flex flex-col gap-2 items-start'>
                <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold'>
                  <option value="Order Placed"> Order Placed </option>
                  <option value="Packing"> Packing </option>
                  <option value="Shipped"> Shipped </option>
                  <option value="Out for Delivery"> Out for Delivery </option>
                  <option value="Delivered"> Delivered </option>
                </select> 
                <button
                  onClick={() => setOrderToDelete(order._id)}
                  className='flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold text-sm px-3 py-2 rounded w-full sm:w-3/4'
                >
                  <FiTrash size={20} /> Delete
                </button>
              </div>           
            </div>
          ))
        }
      </div>

      {/* Modal for delete confirmation */}
      {orderToDelete && (
        <div
          onClick={() => setOrderToDelete(null)}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
          >
            <h2 className="text-lg font-semibold mb-4 text-center">
              Are you sure you want to delete this order?
            </h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                // onClick={async () => {
                //   try {
                //     const response = await axios.post(
                //       backendUrl + '/api/admin/delete-order',
                //       { orderId: orderToDelete },
                //       { headers: { token } }
                //     );
                //     if (response.data.success) {
                //       toast.success('Order deleted successfully');
                //       setOrderToDelete(null);
                //       fetchAllOrders(); // refresh the list
                //     } else {
                //       toast.error(response.data.message);
                //     }
                //   } catch (error) {
                //     toast.error(error.message);
                //   }
                // }}
                onClick={() => toast.info("Order deletion is currently disabled to prevent removal of test orders data.")}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setOrderToDelete(null)}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}  
    </div>
  )

}

export default Orders