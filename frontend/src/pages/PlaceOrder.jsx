import React, { useContext, useState } from 'react'
import Title from "../components/Title"
import CartTotal from "../components/CartTotal"
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {

    const [method, setMethod] = useState('COD');
    const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(data => ({...data, [name]: value}))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
    
        try {

            let orderItems = [];

            for (const itemId in cartItems) {
                const quantity = cartItems[itemId];
    
                if (quantity > 0) {
                    const itemInfo = JSON.parse(JSON.stringify(products.find(product => product._id === itemId)));
    
                    if (itemInfo) {
                        itemInfo.quantity = quantity;
                        orderItems.push(itemInfo);
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }
    
        } catch (error) {
            console.log(error);
            res.json({success: false, error: error.message});
        }
    };    
    
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
        {/* ------Left------ */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

            <div className="text-xl sm:text-2xl my-3">
                <Title title1={'DELIVERY'} title2={'INFORMATION'}/>
            </div>

            <div className="flex gap-3"> 
                <input onChange={onChangeHandler} name='firstName' value={formData.firstName} required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Fist name" />
                <input onChange={onChangeHandler} name='lastName' value={formData.lastName} required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last name" />
            </div>
            <input onChange={onChangeHandler} name='email' value={formData.email} required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email address" />
            <input onChange={onChangeHandler} name='street' value={formData.street} required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" />
            <div className="flex gap-3"> 
                <input onChange={onChangeHandler} name='city' value={formData.city} required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
                <input onChange={onChangeHandler} name='state' value={formData.state} required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
            </div>
            <div className="flex gap-3"> 
                <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zipcode" />
                <input onChange={onChangeHandler} name='country' value={formData.country} required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" />
            </div>
            <input onChange={onChangeHandler} name='phone' value={formData.phone} required className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone number" />
        </div>
            
        {/* ------Right------ */}
        <div className="mt-8">
            <div className="mt-8 min-w-80">
                <CartTotal />
            </div>

            <div className="mt-12"> 
                <Title title1={'PAYMENT'} title2={'METHOD'} />
                
                {/* -------Payment method Selection------- */}
                <div className="flex gap-3 flex-col mb-5 lg:flex-row">
                    <div onClick={() => setMethod('M-PESA')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'M-PESA' ? "bg-green-400" : ''}`}></p>
                        <p className="text-gray-500 text-sm font-medium mx-2">M-PESA</p>
                    </div>
                    <div onClick={() => setMethod('PAYPAL')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'PAYPAL' ? "bg-green-400" : ''}`}></p>
                        <p className="text-gray-500 text-sm font-medium mx-2">PAYPAL</p>
                    </div>
                    <div onClick={() => setMethod('STRIPE')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'STRIPE' ? "bg-green-400" : ''}`}></p>
                        <p className="text-gray-500 text-sm font-medium mx-2">STRIPE</p>
                    </div>
                    <div onClick={() => setMethod('COD')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                        <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'COD' ? "bg-green-400" : ''}`}></p>
                        <p className="text-gray-500 text-sm font-medium mx-2">CASH ON DELIVERY</p>
                    </div>
                </div>
                <div className='w-full text-end mt-8'>
                    <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
                </div>
            </div>
        </div>
    </form>
  )
}

export default PlaceOrder