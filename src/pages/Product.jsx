import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ShopContext } from "../context/ShopContext";
import { renderStars } from "../components/utils";

const Product = () => {

  const { productId} = useParams();
  const {productsData, currency} = useContext(ShopContext);
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
    <div className="border-t pt-10 transition-opacity eas duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div>
          <img src={productData.imgURL} alt={productData.name} />
          <p>{productData.brand}</p>
          <p>{productData.name}</p>
          <p>{productData.description}</p>
          <p>{currency}{productData.price}</p>
          <p>{renderStars(productData.rating)}</p>

        </div>
      </div>
    </div>
  ): <div className="opacity-0"></div>
}

export default Product