import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

const BestSellers = () => {
    const { products } = useContext(ShopContext);
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (products?.length) {
            const bestProduct = products.filter(item => item.rating >= 4);
            setBestSellers(bestProduct.slice(0, 5));
            setLoading(false);
        }
    }, [products]);

    return (
        <>
            <div className="text-center py-8 text-3xl">
                <Title title1="Best" title2="Sellers" />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Discover our best sellers, where quality meets popularity. These top-rated products have captured the hearts of our customers and continue to stand out for their exceptional value and style.
                </p>
            </div>
            {/* Render Best Sellers */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 pb-10">
                {loading || error
                    ? Array.from({ length: 5 }).map((_, i) => <ProductCardSkeleton key={i} />)
                    : bestSellers.map((item) => (
                        <ProductCard
                            key={item._id}
                            _id={item._id}
                            slug={item.slug}
                            name={item.name}
                            price={item.price}
                            img={item.imgURL}
                            brand={item.brand}
                            rating={item.rating}
                        />
                    ))}
            </div>
        </>
    );
};

export default BestSellers;