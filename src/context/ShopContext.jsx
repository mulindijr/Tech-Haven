import { createContext, useEffect, useState } from "react";
import { productsData } from "../constants";


export const ShopContext = createContext();

const ShopContextProvider = ({children}) => {
    const currency = 'Ksh';
    const delivery_fee = 200
    const[search, setSearch] = useState('')
    const[showSearch, setShowSearch] = useState(false)
    const[cartItems, setCartItems] = useState({})

    const addToCart = (itemId) => {

        const cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId]){
                cartData[itemId] += 1;
            }
            else{
                cartData[itemId] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
    }
    
    useEffect(() => {
        console.log(cartItems)
    }, [cartItems])

    const value ={
        productsData, currency, delivery_fee,  
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart

    }
    
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
