import React, { useState,useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../constants';
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineShopping } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ShopContext } from '../context/ShopContext';


const Navigation = () => {

  const [visible, setVisible] = useState(false);
  const {setShowSearch, getCartCount} = useContext(ShopContext);

    return (
        <header className=''>
          <nav className='flex justify-between items-center font-medium p-5'>
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
              <CiSearch onClick={() => setShowSearch(true)} className='w-5 cursor-pointer'/>

              <div className='group relative'>
                <Link to="/login">
                  <FaRegUser className='w-5 cursor-pointer'/>
                </Link>
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
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
              </Link> 
              <FaBars onClick={() => setVisible(true)} className='w-5 cursor-pointer sm:hidden'/>   
            </div>
              {/* Mobile Navigation */}
              <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white z-10 transition-all ${visible ? 'w-full': 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                  <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3'>
                    <MdOutlineKeyboardArrowRight className='h-4 rotate-180'/>
                    <p>Back</p>
                  </div>
                  {navLinks.map((link) => (
                    <NavLink 
                      to={link.path} 
                      key={link.path} 
                      onClick={()=>setVisible(false)}
                      className='py-2 pl-6 border'
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>
          </nav>
        </header>
    );
};

export default Navigation;
