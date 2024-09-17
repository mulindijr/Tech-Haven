import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, brand, currentProductId }) => {
  const { productsData } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (productsData.length > 0) {
      let productsDataCopy = productsData.slice();
      productsDataCopy = productsDataCopy.filter((item) => item.category === category);
      productsDataCopy = productsDataCopy.filter((item) => item.brand === brand);
      productsDataCopy = productsDataCopy.filter((item) => item._id !== currentProductId);
      setRelated(productsDataCopy.slice(0, 5));
    }
  }, [productsData, category, brand, currentProductId]);

  const handleProductClick = (id) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    navigate(`/product/${id}`);
  }; 

  return (
    <div className="my-10">
      <div>
        <Title title1={'Related'} title2={'Products'} />
      </div>
      {related.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {related.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              img={item.imgURL}
              brand={item.brand}
              name={item.name}
              price={item.price}
              rating={item.rating}
              onClick={() => handleProductClick(item._id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-200 p-10 text-center text-lg sm:text-3xl text-red-500 rounded-xl">
          No related products are available.
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
