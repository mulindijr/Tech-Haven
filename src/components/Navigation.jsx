import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../constants';
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineShopping } from "react-icons/ai";
import { FaBars } from "react-icons/fa";

const Navigation = () => {

    return (
        <header className='bg-white sticky top-0 left-0 right-0 z-10 p-5 shadow-md'>
          <nav className='flex justify-between items-center font-medium'>
            <Link to="/">
              <h1 className='text-xl font-bold cursor-pointer'>
                Tech<span className='text-red-500'>Haven</span>
              </h1>
            </Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
              {navLinks.map((link) => (
                <NavLink 
                  to={link.path} 
                  key={link.path} 
                  className='flex flex-col items-start gap-1'
                >
                  {link.label}
                  <hr className='w-2/4 border-none h-[1.5px] bg-red-500 hidden'/>
                </NavLink>
              ))}
            </ul>

            <div className='flex items-center gap-4'>
              <CiSearch className='w-5 cursor-pointer'/>

              <div className='group relative'>
                <FaRegUser className='w-5 cursor-pointer'/>
                <div className='group-hover:block hidden absolute dropdown-menu right-0 p-4'>
                  <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                    <p className='cursor-pointer hover:text-black'>Orders</p>
                    <p className='cursor-pointer hover:text-black'>Logout</p>
                  </div>
                </div>
              </div>

              <Link to='/cart' className='relative'>
                <AiOutlineShopping className='w-5 m-w-5 bg-white'/>
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>10</p>
              </Link> 

              <FaBars className='w-5 cursor-pointer sm:hidden'/>   
            </div>
          </nav>
        </header>
    );
};

export default Navigation;
