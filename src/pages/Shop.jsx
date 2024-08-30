import ProductsCard from "../components/ProductCard"
import { productsData } from "../constants"


const Shop = () => {
  return (
    <div className="mt-16 mx-10 mb-2 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-5">
      {productsData.map((product) => (
        <ProductsCard 
          key={product.name}
          img = {product.imgURL}
          brand = {product.brand}
          name = {product.name}
          price = {product.price} 
          rating={product.rating}       
        />
      ))}
  </div>

  )
}

export default Shop