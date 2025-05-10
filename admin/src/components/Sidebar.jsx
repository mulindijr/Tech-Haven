import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosAddCircleOutline, IoIosList } from 'react-icons/io';
import { IoBagCheckOutline } from 'react-icons/io5';
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiFillHome } from 'react-icons/ai';

const Sidebar = () => {
  const links = [
    { to: "/", icon: <AiFillHome />, text: "Dashboard" },
    { to: "/add", icon: <IoIosAddCircleOutline />, text: "Add Items" },
    { to: "/list", icon: <IoIosList />, text: "List Items" },
    { to: "/orders", icon: <IoBagCheckOutline />, text: "Orders" },
    { to: "/customers", icon: <HiOutlineUserGroup />, text: "Customers" }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 w-64 h-screen bg-white border-r border-gray-100 shadow-lg">
        <div className="flex flex-col gap-2 pt-8 px-4">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) =>
                `group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-indigo-50 text-indigo-600 font-semibold shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-indigo-500'}`
              }
            >
              <span className="text-2xl text-gray-400 group-hover:text-indigo-500 group-[.active]:text-indigo-600">
                {link.icon}
              </span>
              <p className="text-sm font-medium hidden md:block">{link.text}</p>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-100 shadow-lg z-50">
        <div className="flex items-center justify-around h-full px-2">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 flex-1 h-full
                ${isActive 
                  ? 'bg-indigo-50 text-indigo-600 font-semibold'
                  : 'text-gray-500 hover:bg-gray-50'}`
              }
            >
              <span className="text-2xl">
                {link.icon}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;