import { ShopContext } from "../context/ShopContext"
import { useState, useEffect } from "react"
import Title from "./Title"
import ProductItem from "./ProductItem"
import { useContext } from "react"

const BestSellers = () => {

    const {productsData} =useContext(ShopContext)
    const [bestSellers, setBestSellers] = useState([])

    useEffect(()=>{
        const bestProduct = (productsData.filter(item => item.rating>=4));
        setBestSellers(bestProduct.slice(0,5));
    },[])

  return (
    <>
        <div className="text-center py-8 text-3xl">
            <Title title1={'Best'} title2={'Sellers'} />
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                Discover our best sellers, where quality meets popularity. These top-rated products have captured the hearts of our customers and continue to stand out for their exceptional value and style.        
            </p>
        </div>
        {/* Render Best Sellers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 pb-10">
            {bestSellers.map((item, index) => (
                <ProductItem 
                    key={index}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    img={item.imgURL}
                    brand={item.brand}
                    rating={item.rating}            
                />
            ))}
        </div>
    </>
  )
}

export default BestSellers