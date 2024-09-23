import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from "../components/CartTotal";
import { PiShoppingCartThin } from "react-icons/pi";
import RecentlyViewedProducts from "../components/RecentlyViewedProducts";
import {toast} from 'react-toastify';

const Cart = () => {
  const { productsData, currency, cartItems, updateQuantity,navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      if (quantity > 0) {
        const product = productsData.find((product) => product._id === itemId);
        if (product) {
          tempData.push({
            ...product,
            quantity
          });
        }
      }
    }
    
    setCartData(tempData);
  }, [cartItems, productsData]);

  const handleDelete = (itemId) => {
    updateQuantity(itemId, 0);
    toast.success('Item removed from cart!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="pt-4">

      <div className="text-xl mb-2">
        <Title title1={'YOUR'} title2={'CART'}/> 
      </div>

      {cartData.length === 0 ? (
        <div className="bg-slate-300 p-5 my-2 rounded">
          <div className="flex flex-col items-center justify-center text-center gap-4">
            <div className="flex items-center justify-center p-5 bg-slate-400 w-24 h-24 rounded-full">
              <PiShoppingCartThin className="w-20 h-20 text-red-700"/>
            </div>
            <h2 className="text-xl">Your cart is empty!</h2>
            <p className="text-sm sm:text-xl">Browse our categories and discover our best deals!</p>
            <button onClick={() => navigate('/shop')} className="p-4 bg-black hover:bg-gray-900 text-white text-sm font-semibold rounded-2xl">START SHOPPING</button>
          </div>
        </div>
      ) : 
        <>
          <div>
            {
              cartData.map((item,index)=>(
                <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                  <div className="flex items-start gap-6">
                    <img src={item.imgURL} alt={item.name} className="w-16 sm:w-20"/>
                    <div>
                      <p className="text-xs sm:text-lg font-medium">{item.name}</p>
                      <div className="mt-2">
                        <p>{currency} {item.price}</p>
                      </div>
                    </div>
                  </div>
                  <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, Number(e.target.value))} className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" type="number" min={1} defaultValue={item.quantity} />
                  <RiDeleteBin6Line onClick={() => handleDelete(item._id)} className="w-5 h-5 cursor-pointer"/>
                </div>
              ))
            }
          </div>

          <div className="flex justify-end my-10">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <button onClick={() => navigate('/place-order')} className="bg-black text-white text-sm my-8 px-8 py-3">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      }      
      <RecentlyViewedProducts />  
    </div>
  );
};

export default Cart; 