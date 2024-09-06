import { useState } from "react"
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Shop = () => {
  const [showFilter, setShowFilter] = useState(false)

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
              <input className="w-3" type="checkbox" value={'SmartPhones'} />SmartPhones
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Televisions'} />Televisions
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Laptops'} />Laptops
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'SoundDevices'} />SoundDevices
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
  </div>
  )
}

export default Shop