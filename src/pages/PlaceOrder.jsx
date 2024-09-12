import React, { useState } from 'react'
import Title from "../components/Title"
import CartTotal from "../components/CartTotal"

const PlaceOrder = () => {

    const [method, setMethod] = useState('M-PESA');
    
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
        {/* ------Left------ */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

            <div className="text-xl sm:text-2xl my-3">
                <Title title1={'DELIVERY'} title2={'INFORMATION'}/>
            </div>

            <div className="flex gap-3"> 
                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Fist name" />
                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last name" />
            </div>
            <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email address" />
            <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Street" />
            <div className="flex gap-3"> 
                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
            </div>
            <div className="flex gap-3"> 
                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zipcode" />
                <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" />
            </div>
            <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone number" />
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
            </div>
        </div>
    </div>
  )
}

export default PlaceOrder