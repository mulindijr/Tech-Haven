import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

const FeaturedProducts = () => {
    const { products } = useContext(ShopContext);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (products?.length) {
            setFeaturedProducts(products.slice(0, 10));
            setLoading(false);
        }
    }, [products]);

    return (
        <div>
            <div className="text-center py-8 text-3xl">
                <Title title1="Featured" title2="Products" />
                <p className="w-3/4 m-auto text-sm md:text-base text-gray-600">
                    Check out our top selections, showcasing quality and style that stand out. Each product is a customer favorite, carefully chosen to enhance your experience.
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {loading
                    ? Array.from({ length: 10 }).map((_, i) => <ProductCardSkeleton key={i} />)
                    : featuredProducts.map((item) => (
                    <ProductCard
                        key={item._id}
                        _id={item._id}
                        slug={item.slug}
                        img={item.imgURL}
                        brand={item.brand}
                        name={item.name}
                        price={item.price}
                        rating={item.rating}
                    />
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;