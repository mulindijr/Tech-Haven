import { useContext } from "react"
import {ShopContext} from "../context/ShopContext"
import Title from "./Title"

const FeaturedProducts = () => {

    const {productsData}=useContext(ShopContext)
    console.log(productsData)
  return (
    <div className="my-10">
        <div className="text-center py-8 text-3xl">
            <Title title1={'Featured'} title2={'Products'}/>
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>
    </div>
  )
}

export default FeaturedProducts