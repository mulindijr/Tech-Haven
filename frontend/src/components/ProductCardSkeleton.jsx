const ProductCardSkeleton = () => {
  return (
    <div className="border shadow-md rounded-md p-5 animate-pulse flex flex-col justify-between h-full">
      <div>
        {/* Image Placeholder */}
        <div className="flex justify-center items-center h-40 bg-gray-300 rounded-md"></div>

        {/* Brand Placeholder */}
        <div className="mt-2 h-4 w-20 bg-gray-300 rounded"></div>

        {/* Product Name Placeholder */}
        <div className="mt-2 h-6 w-full bg-gray-300 rounded"></div>

        {/* Rating Placeholder */}
        <div className="mt-2 flex gap-1">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="h-4 w-4 bg-gray-300 rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Price and Icon Placeholder */}
      <div className="flex items-center justify-between mt-4">
        <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
        <div className="h-6 w-6 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;