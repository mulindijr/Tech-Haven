import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const RelatedProducts = ({ category, brand, currentProductId }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsDataCopy = products.slice();
      productsDataCopy = productsDataCopy.filter((item) => item.category === category);
      productsDataCopy = productsDataCopy.filter((item) => item.brand === brand);
      productsDataCopy = productsDataCopy.filter((item) => item._id !== currentProductId);
      setRelated(productsDataCopy.slice(0, 5));
    }
  }, [products, category, brand, currentProductId]);

  // If there are no related products, return null
  if (related.length === 0) return null;

  return (
    <div className="my-10">
      <div>
        <Title title1={'Related'} title2={'Products'} />
      </div>      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <Link to={`/product/${item.slug}`} key={item._id}>
            <ProductCard
              _id={item._id}
              slug={item.slug}
              img={item.imgURL}
              brand={item.brand}
              name={item.name}
              price={item.price}
              rating={item.rating}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;