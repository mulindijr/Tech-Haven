import { useContext } from "react";
import { renderStars } from "./utils";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({id, img, brand, name, price, rating}) => {

  const {currency} =useContext(ShopContext)

    return (
      <Link 
        className="shadow-md p-5 cursor-pointer group"
        to={`/product/${id}`}
      >
      <div className="">
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
        <p className="text-pink-400">{currency}{price}</p>
      </div>
    </Link>
    )
  }
  
  export default ProductItem;
