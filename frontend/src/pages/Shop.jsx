import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Shop = () => {
  const {productsData, search, showSearch} =useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [brand, setBrand] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleBrand = (e) => {
    if(brand.includes(e.target.value)){
      setBrand(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setBrand(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = productsData.slice()

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if(brand.length > 0){
      productsCopy = productsCopy.filter(item => brand.includes(item.brand))
    }
    setFilterProducts(productsCopy)
  }

  const sortProduct =() => {

    let filterProductsCopy = filterProducts.slice()
    
    switch(sortType){
      case 'Low-High':
        setFilterProducts(filterProductsCopy.sort((a,b) => a.price - b.price))
        break;

      case 'High-Low':
        setFilterProducts(filterProductsCopy.sort((a,b) => b.price - a.price))
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  },[category, brand, search, showSearch])

  useEffect(() => { 
    sortProduct();
  } ,[sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-4">
      {/*filter options*/}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-sm font-medium sm:text-xl flex items-center cursor-pointer gap-1">FILTERS
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
              <input className="w-3" type="checkbox" value={'Tecno'} onChange={toggleBrand}/>Tecno
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Lenovo'} onChange={toggleBrand}/>Lenovo
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Apple'} onChange={toggleBrand}/>Apple
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Dell'} onChange={toggleBrand}/>Dell
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Infinix'} onChange={toggleBrand}/>Infinix
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Amtec'} onChange={toggleBrand}/>Amtec
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Tornado'} onChange={toggleBrand}/>Tornado
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Vitron'} onChange={toggleBrand}/>Vitron
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Redmi'} onChange={toggleBrand}/>Redmi
            </p>
          </div>
        </div>               
      </div>   

      {/*Right Side*/}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title title1={'ALL'} title2={'PRODUCTS'}/>
          {/*sort by*/}
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="Sort by: Relevance">Sort by: Relavance</option>
            <option value="Low-High">Price: Low to High</option>
            <option value="High-Low">Price: High to Low</option>
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