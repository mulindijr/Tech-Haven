import { renderStars } from "./utils";

const ProductsCard = ({img, brand, name, price, rating}) => {
    return (
      <div className="flex flex-1 flex-col w-full max-sm:w-full shadow-md p-5 cursor-pointer">
        <div className="hover:scale-105 hover:duration-500 duration-500">
          <div className="flex justify-center items-center">
            <img 
              src={img} alt={name}
              className="w-[200px] h-[200px]"
            />
          </div>
          <span className="text-sm text-green-400">{brand}</span>
          <h3 className="mt-2 text-lg leading-normal font-semibold line-clamp-2">{name}</h3>
          <div>
            {renderStars(rating)}
          </div>
          <p className="text-pink-400">{price}</p>            
        </div>      
      </div>
    )
  }
  
  export default ProductsCard;
