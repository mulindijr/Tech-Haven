import React, { useContext } from 'react';
import { ShopContext } from "../context/ShopContext";
import Title from './Title';
import ProductCard from './ProductCard';

const RecentlyViewed = () => {
    const { recentlyViewed } = useContext(ShopContext);

    return (
        <div>
            <div>
                <Title title1={'Recently'} title2={'Viewed'}/>
            </div>
            {recentlyViewed.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
                    {recentlyViewed.map((item, index) => (
                        <ProductCard 
                            key={index}
                            id={item._id}
                            img={item.imgURL}
                            brand={item.brand}
                            name={item.name}
                            price={item.price}
                            rating={item.rating}                    
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-slate-200 p-10 text-center text-lg sm:text-3xl text-red-500 rounded-xl mb-6">
                     No recenlty viewed products
                </div>
            )}
        </div>
        
    );
};

export default RecentlyViewed;
