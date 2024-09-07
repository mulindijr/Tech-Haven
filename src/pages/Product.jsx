import { useContext } from "react";
import { useParams } from "react-router-dom"
import { ShopContext } from "../context/ShopContext";

const Product = () => {

  const { productId} = useParams();
  const {productsData} = useContext(ShopContext);
  const [products, setProducts] = useState([]);

  

  return (
    <div>Product</div>
  )
}

export default Product