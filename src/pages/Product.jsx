import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ShopContext } from "../context/ShopContext";
import { renderStars } from "../components/utils";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {

  const { productId} = useParams();
  const {productsData, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState([]);

  const fetchProductsData = async () => {

    productsData.map(item => {
      if(item._id === productId) {
        setProductData(item)
        return null;
      }
    })

  }  

  useEffect(() => { 
    fetchProductsData()
  }, [productId])

  return productData ? (
    <div className="border-t pt-10 mb-10 transition-opacity eas duration-500 opacity-100">      
      <div className="flex gap-5 sm:gap-5 flex-col sm:flex-row">
        <div className="w-full sm:w-1/3 flex items-center justify-center">
          <img 
            className="sm:w-full h-auto object-cover"
            src={productData.imgURL} 
            alt={productData.name} 
          /> 
        </div>
        <div className="w-full sm:w-1/2">
          <p className="font-medium sm:text-2xl mt-2">{productData.name}</p>
          <p className="font-medium text-sm text-green-500 mt-2">{productData.brand}</p>
          <hr className="mt-4 sm:w-5/5"/>
          <p className="font-medium sm:text-2xl mt-2">{currency} {productData.price}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-medium text-sm">{renderStars(productData.rating)}</span>
            <p className="italic">(66 verified ratings)</p>
          </div>
          <button onClick={() => addToCart(productData._id)} className="bg-yellow-500 text-white font-bold px-8 py-1 sm:py-3 mt-2 w-full sm:text-md cursor-pointer active:bg-gray-700">ADD TO CART</button>
          <hr className="mt-4 sm:w-5/5"/>
          <div className="text-sm sm:text-lg text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original product</p>
            <p>Cash on delivery is available on  this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>      
        </div>
      </div>
      {/* description and review section */}
      <div className="mt-10">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(64)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm leading-normal sm:text-lg text-gray-500">
          <p>{productData.description}</p>
        </div>
      </div>
      {/* ----------- Display Related Products ----------- */}
      <RelatedProducts category={productData.category} brand={productData.brand} currentProductId={productId}/>
    </div>
  ): <div className="opacity-0"></div>
}

export default Product