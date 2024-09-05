import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../constants';
import { FaSearch, FaUser } from 'react-icons/fa';

const Navigation = () => {

    return (
        <header className='bg-white sticky top-0 left-0 right-0 z-10 shadow-md p-5'>
          <nav className='flex justify-between items-center max-lg:ml-5 mx-20'>
            <Link to="/">
              <h1 className='text-xl font-bold cursor-pointer'>
                Tech<span className='text-red-500'>Haven</span>
              </h1>
            </Link>

            <ul className='flex justify-end items-center gap-5 max-md:hidden'>
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
          </nav>
        </header>
    );
};

export default Navigation;
