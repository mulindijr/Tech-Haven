import { useContext, useEffect } from 'react'
import { ShopContext } from "../context/ShopContext"
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyPayment = () => {
    const { navigate, token, setCartItems, backendUrl} = useContext(ShopContext);
    const [ searchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {

      try {

        if (!token) {
          return null          
        }
        
        const response = await axios.post(backendUrl + '/api/order/verifystripe', {success, orderId}, {headers: {token}})

        if (response.data.success) {
          setCartItems({});
          navigate('/orders');
        } else {
          navigate('/cart');
        }

      } catch (error) {
        console.log(error);
        toast.error(error.message);        
      }

    }

    useEffect(() => {
      verifyPayment();
    },[token])

  return (
    <div className='flex items-center justify-center h-screen'>
      <p>Processing your payment, please wait...</p>
    </div>
  )
}

export default VerifyPayment