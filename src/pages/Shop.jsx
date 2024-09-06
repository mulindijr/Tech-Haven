import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Shop = () => {
  const {productsData} =useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [brand, setBrand] = useState([])

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev, e.target.value])
    }
  }

  useEffect(() => {
    setFilterProducts(productsData)
  },[])

  useEffect(() => {
    console.log(category)
  },[category])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/*filter options*/}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-1">FILTERS
          <MdOutlineKeyboardArrowRight className={`h-10 flex items-center sm:hidden ${showFilter ? 'rotate-90' : ''}`}/>                   
        </p> 
        {/*filter by category*/}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 font-medium text-sm">FILTER BY CATEGORY</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'phone'} onChange={toggleCategory}/>SmartPhones
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'television'} onChange={toggleCategory}/>Televisions
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'laptop'} onChange={toggleCategory}/>Laptops
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'soundDevice'} onChange={toggleCategory}/>SoundDevices
            </p>
          </div>
        </div> 
        {/*filter by brand*/}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 font-medium text-sm">FILTER BY BRAND</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Techno'} />Techno
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Samsung'} />Lenovo
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Apple'} />Apple
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Dell'} />Dell
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Sony'} />Infinix
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Amtec'} />Amtec
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Tornado'} />Tornado
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Vitron'} />Vitron
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Redmi'} />Redmi
            </p>
          </div>
        </div>               
      </div>   

      {/*Right Side*/}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title title1={'ALL'} title2={'PRODUCTS'}/>
          {/*sort by*/}
          <select className="border-2 border-gray-300 text-sm px-2">
            <option value="Sort by: Relevance">Sort by: Relavance</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
          </select>
        </div>
        {/*Map Products*/}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 mb-6">
          {
            filterProducts.map((item,index) => (
              <ProductItem 
                key={index}
                id = {item._id}
                img = {item.imgURL}
                brand = {item.brand}
                name = {item.name}
                price = {item.price}
                rating = {item.rating}
              />
            ))
          }
        </div>
      </div>      
    </div>
  )
}

export default Shop