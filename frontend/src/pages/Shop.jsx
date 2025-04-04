import { useContext, useEffect, useState, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Title from "../components/Title";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const Shop = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    setCategory((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  const toggleBrand = (e) => {
    setBrand((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.slice();

    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    if (brand.length > 0) {
      filtered = filtered.filter((item) => brand.includes(item.brand));
    }

    switch (sortType) {
      case "Low-High":
        return filtered.slice().sort((a, b) => a.price - b.price);
      case "High-Low":
        return filtered.slice().sort((a, b) => b.price - a.price);
      default:
        return filtered;
    }
  }, [products, search, showSearch, category, brand, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-4">
      {/* Filter Sidebar */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-sm font-medium sm:text-xl flex items-center cursor-pointer gap-1"
        >
          FILTERS
          <MdOutlineKeyboardArrowRight
            className={`h-10 flex items-center sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>

        {/* Filter by Category */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 font-medium text-sm">FILTER BY CATEGORY</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Smartphone", "Television", "Laptop", "Audio"].map((cat) => (
              <label key={cat} className="flex gap-2">
                <input type="checkbox" value={cat} onChange={toggleCategory} />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Filter by Brand */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 font-medium text-sm">FILTER BY BRAND</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Tecno", "Lenovo", "Apple", "Dell", "Infinix", "Amtec", "Tornado", "Vitron", "Redmi", "Xiaomi"].map((br) => (
              <label key={br} className="flex gap-2">
                <input type="checkbox" value={br} onChange={toggleBrand} />
                {br}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title title1="ALL" title2="PRODUCTS" />
          {/* Sort by */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevance</option>
            <option value="Low-High">Price: Low to High</option>
            <option value="High-Low">Price: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 mb-6">
          {products.length === 0 ? (
            Array.from({ length: 12 }).map((_, i) => <ProductCardSkeleton key={i} />)
          ) : filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map((item) => (
              <ProductCard
                key={item._id}
                id={item._id}
                img={item.imgURL}
                brand={item.brand}
                name={item.name}
                price={item.price}
                rating={item.rating}
              />
            ))
          ) : (
            <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center h-80">
              <p className="text-gray-600 text-lg">No products match the filters.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Shop;