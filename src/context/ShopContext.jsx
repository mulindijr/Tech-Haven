import { createContext, useEffect, useState } from "react";
import { productsData } from "../constants";


export const ShopContext = createContext();

const ShopContextProvider = ({children}) => {
    const currency = 'Ksh';
    const delivery_fee = 200
    const[search, setSearch] = useState('')
    const[showSearch, setShowSearch] = useState(false)
    const[cartItems, setCartItems] = useState({})

    const addToCart = async(itemId) => {
        const cartData = structuredClone(cartItems);
    
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
    
        setCartItems(cartData);
    }

    useEffect(() => {
        // Load cart items from local storage on component mount
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
        setCartItems(storedCartItems);
    }, []);
    
    useEffect(() => {
        // Save cart items to local storage whenever they change
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);
    
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
