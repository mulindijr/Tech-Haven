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
    
    const getCartCount = () => {
        return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
    };

    const updateQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId] = quantity;

        setCartItems(cartData);
    }

    const value ={
        productsData, currency, delivery_fee,  
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateQuantity

    }
    
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
