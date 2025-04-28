import React from 'react'
import { FiBell } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

const Navbar = ({setToken}) => {
  return (
    <div className='flex justify-between items-center px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-4 sticky top-0 z-50 bg-gray-50 shadow-md'>
      <NavLink to="/" className='flex items-center'>
        <h1 className='text-xl font-bold cursor-pointer'>
          Tech<span className='text-red-500'>Haven</span>
        </h1>
      </NavLink>
        
      <div className='flex items-center space-x-4'>
        <div className='hover:bg-gray-100 p-2 rounded-full cursor-pointer'>
          <div className="relative" onClick={() => toast.info('Notifications functionality coming soon!')}>
            <FiBell className="text-2xl text-gray-700" />            
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </div>
        </div>          
        <button onClick={() => setToken('')} className='bg-red-400 text-white px-4 py-2 rounded-full'>
            Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar