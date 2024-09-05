import { createContext } from "react";
import { productsData } from "../constants";


export const ShopContext = createContext();

const ShopContextProvider = ({children}) => {
    const currency = 'Ksh';
    const delivery_fee = 200

    const value ={
        productsData, currency, delivery_fee   

    }
    
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
