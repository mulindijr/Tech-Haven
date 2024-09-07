import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ShopContext } from "../context/ShopContext";

const Product = () => {

  const { productId} = useParams();
  const {productsData} = useContext(ShopContext);
  const [productData, setProductData] = useState([]);

  const fetchProductsData = async () => {

    productsData.map(item => {
      if(item._id === productId) {
        setProductData(item)
        console.log(item)
        return null;
      }
    })

  }  

  useEffect(() => { 
    fetchProductsData()
  }, [productId])

  return (
    <div>Product</div>
  )
}

export default Product