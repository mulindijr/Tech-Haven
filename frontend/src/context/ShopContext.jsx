import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const ShopContext = createContext();

const ShopContextProvider = ({children}) => {
    const currency = 'Ksh';
    const delivery_fee = 200
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('token'); // Get token from localStorage
        if (storedToken) {
            try {
                const decoded = jwt_decode(storedToken); // Decode the token to access its expiration
                if (decoded.exp * 1000 < Date.now()) { // Check if token has expired
                    localStorage.removeItem('token'); // Remove expired token from localStorage
                    return ''; // Reset token state to empty
                }
                return storedToken; // If the token is valid, return it
            } catch (error) {
                console.log("Error decoding token:", error);
                return ''; // If there’s an error decoding, reset the token
            }
        }
        return ''; // If no token exists, return an empty string
    });
    
    const[products, setProducts] = useState([])
    const[search, setSearch] = useState('')
    const[showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem('cartItems')) || {});      
    const [recentlyViewed, setRecentlyViewed] = useState(() => JSON.parse(localStorage.getItem('recentlyViewed')) || []);
    const navigate = useNavigate();

    const addToCart = async(itemId) => {
        const cartData = structuredClone(cartItems);
    
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
    
        setCartItems(cartData);

        if (token) {

            try {

                await axios.post(backendUrl + '/api/cart/add', { itemId }, { headers: {token} });
                
            } catch (error) {
                console.log(error);
                toast.error(error.message);                
            }
        }
    }

    // Function to add a product to recently viewed
    const addToRecentlyViewed = (product) => {
        setRecentlyViewed((prev) => {
          const exists = prev.find((item) => item._id === product._id);
          if (exists) return prev;
      
          const newRecent = [product, ...prev];
          return newRecent.length > 5 ? newRecent.slice(0, 5) : newRecent;
        });
    };
    
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

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, quantity }, { headers: {token} });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
    
        for (const itemId in cartItems) {
            let itemInfo = products.find(product => product._id === itemId);
            if (itemInfo && cartItems[itemId] > 0) {
                // Remove commas from the price string and convert it to a number
                const price = parseInt(itemInfo.price.replace(/,/g, ''), 10);
                totalAmount += price * cartItems[itemId];
            }
        }
    
        // Format the total amount with commas
        return totalAmount.toLocaleString();
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        }catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const getUserCart = async (token) => {

        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers:{token}});
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getProductsData();
    }, [])

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            getUserCart(token);
        }
    }, [token]);

    const value ={
        products, currency, delivery_fee,  
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount, navigate, recentlyViewed, addToRecentlyViewed, backendUrl, getProductsData,
        token, setToken, setCartItems       
    }
    
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
