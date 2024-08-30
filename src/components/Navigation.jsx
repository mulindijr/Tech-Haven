import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

export const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },    
    {
        label: "Account",
        subLinks: [
            { label: "Sign In", path: "/login" },
            { label: "My Account", path: "/my-account" },
            { label: "Orders", path: "/orders" }
        ]
    },
    { icon: <FaShoppingCart />, path: "/cart" }
];

const Navigation = () => {
    const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);

    const toggleAccountMenu = () => {
        setAccountMenuOpen(!isAccountMenuOpen);
    };

    const closeAccountMenu = () => {
        setAccountMenuOpen(false);
    };

    const handleLinkClick = () => {
        closeAccountMenu();
    };

    return (
        <header className='bg-blue-100 sticky top-0 left-0 right-0 z-10 shadow-md p-5'>
          <nav className='flex justify-between items-center max-lg:ml-5 mx-20'>
            <Link to="/" onClick={handleLinkClick}>
              <h1 className='text-xl font-bold cursor-pointer'>
                Tech<span className='text-red-500'>Haven</span>
              </h1>
            </Link>
            <ul className='flex justify-end items-center gap-5 relative'>
              {navLinks.map((link) => (
                <li 
                  key={link.label || link.path} 
                  className='font-medium hover:text-red-400 relative'
                >
                  {link.subLinks ? (
                    <>
                      <div onClick={toggleAccountMenu} className="cursor-pointer">
                        {link.label}
                      </div>
                      {isAccountMenuOpen && (
                        <ul className='absolute w-32 top-full mt-2 left-0 bg-white text-black shadow-lg rounded-lg'>
                          {link.subLinks.map((subLink) => (
                            <li key={subLink.label} className='px-4 py-2 hover:bg-gray-100 hover:text-red-400'>
                              <Link to={subLink.path} onClick={handleLinkClick}>
                                {subLink.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link to={link.path} onClick={handleLinkClick}>
                      {link.icon ? link.icon : link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </header>
    );
};

export default Navigation;
