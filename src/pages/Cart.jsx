import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";

const Cart = () => {
  const { productsData, cartItems } = useContext(ShopContext);
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

  return (
    <div className=" border-t pt-14">
      
    </div>
  );
};

export default Cart; 