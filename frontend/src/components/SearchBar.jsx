import React, {useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import { FaSearch,FaTimes } from 'react-icons/fa'
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if(location.pathname.includes('/shop')) {
            setVisible(true);        
        }
        else{
            setVisible(false);
        }
    },[location])

  return showSearch && visible ? (
    <div className='border-t border-b text-center bg-gray-50'>
        <div className='inline-flex items-center justify-center border border-gray-500 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 '>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm' />
            <FaSearch className='text-gray-500 w-4'/>
        </div>
        <FaTimes className='text-gray-500 w-4 inline cursor-pointer' onClick={()=>setShowSearch(false)}/>
    </div>
  ) : null;
}

export default SearchBar