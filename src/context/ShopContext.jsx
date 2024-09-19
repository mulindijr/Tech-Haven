import { createContext, useEffect, useState } from "react";
import { productsData } from "../constants";
import { useNavigate } from "react-router-dom";


export const ShopContext = createContext();

const ShopContextProvider = ({children}) => {
    const currency = 'Ksh';
    const delivery_fee = 200
    const[search, setSearch] = useState('')
    const[showSearch, setShowSearch] = useState(false)
    const[cartItems, setCartItems] = useState({})
    const [recentlyViewed, setRecentlyViewed] = useState([])
    const navigate = useNavigate();

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
        
        // Load recently viewed items from local storage on component mount
        const storedRecentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        setRecentlyViewed(storedRecentlyViewed);
    }, []);
    
    useEffect(() => {
        // Save cart items to local storage whenever they change
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        // Save recently viewed items to local storage whenever they change
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }, [recentlyViewed]);
    
    const getCartCount = () => {
        return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
    };

    const updateQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId] = quantity;

        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;
    
        for (const itemId in cartItems) {
            let itemInfo = productsData.find(product => product._id === itemId);
            if (itemInfo && cartItems[itemId] > 0) {
                // Remove commas from the price string and convert it to a number
                const price = parseInt(itemInfo.price.replace(/,/g, ''), 10);
                totalAmount += price * cartItems[itemId];
            }
        }
    
        // Format the total amount with commas
        return totalAmount.toLocaleString();
    };       

    const value ={
        productsData, currency, delivery_fee,  
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount, navigate

    }
    
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
