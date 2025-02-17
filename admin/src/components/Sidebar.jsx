import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosAddCircleOutline, IoIosList } from 'react-icons/io';
import { IoBagCheckOutline } from 'react-icons/io5';

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2 border-gray-200 bg-white">
      <div className="flex flex-col gap-3 pt-8 pl-[5%]">
        {/* Add Items Link */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all duration-200 ${
              isActive
                ? 'bg-[#ffebf5] border-l-4 border border-red-300 border-r-0 text-black font-semibold'
                : 'text-gray-600 bg-gray-100 border border-r-0 hover:text-gray-900'
            }`
          }
        >
          <IoIosAddCircleOutline className="text-2xl" />
          <p className="hidden md:block text-sm">Add Items</p>
        </NavLink>

        {/* List Items Link */}
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all duration-200 ${
              isActive
                ? 'bg-[#ffebf5] border-l-4 border border-red-300 border-r-0 text-black font-semibold'
                : 'text-gray-600 bg-gray-100 border border-r-0 hover:text-gray-900'
            }`
          }
        >
          <IoIosList className="text-2xl" />
          <p className="hidden md:block text-sm">List Items</p>
        </NavLink>

        {/* Orders Link */}
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all duration-200 ${
              isActive
                ? 'bg-[#ffebf5] border-l-4 border border-red-300 border-r-0 text-black font-semibold'
                : 'text-gray-600 bg-gray-100 border border-r-0 hover:text-gray-900'
            }`
          }
        >
          <IoBagCheckOutline className="text-2xl" />
          <p className="hidden md:block text-sm">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;