import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoIosAddCircleOutline, IoIosList } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";;

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 '>
        <div className='flex flex-col gap-2 pt-6 pl-[5%] text-[15px]'>
            <NavLink className='flex items-center gap-2 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to='/add'>
                <IoIosAddCircleOutline className='text-3xl'/>
                <p className='hidden md:block'>Add Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-2 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to='/list'>
                <IoIosList className='text-3xl'/>
                <p className='hidden md:block'>List Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-2 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to='/orders'>
                <IoBagCheckOutline className='text-3xl'/>
                <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
                   
    </div>
  )
}

export default Sidebar