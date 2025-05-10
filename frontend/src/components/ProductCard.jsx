import { useContext } from "react";
import { renderStars } from "./utils";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import { toast } from "react-toastify";

const ProductCard = ({_id, img, brand, name, price, rating, onClick, slug}) => {
  const {currency, addToCart} = useContext(ShopContext);

  const handleAddToCart = () => {
    addToCart(_id);
    toast.success("Item added to cart!")
  };

  return (
    <div className="border shadow-md rounded-md p-5 cursor-pointer group flex flex-col justify-between h-full">
      <Link
        to={`/product/${slug}`}
        onClick={() => onClick(slug)}
      >
        <div>
          <div className="flex justify-center items-center">
            <img
              src={img}
              alt={name}
              className="transform transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <span className="text-sm text-green-400">{brand}</span>
          <p className="mt-2 text-sm leading-normal font-semibold line-clamp-2">{name}</p>
          <div>{renderStars(rating)}</div>
        </div>          
      </Link>
      <div className="flex items-center justify-between">
        <p className="text-red-500 font-extrabold">{currency} {price}</p>
        <AiOutlineShopping className="text-lg cursor-pointer" onClick={handleAddToCart}/>
      </div>
    </div>
  )
}
  
export default ProductCard;