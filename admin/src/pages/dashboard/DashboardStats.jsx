import React from 'react';
import StatCard from './StatCard';
import { HiOutlineCurrencyDollar, HiOutlineShoppingCart, HiOutlineUserGroup } from 'react-icons/hi';

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Revenue */}
      <StatCard
        icon={<HiOutlineCurrencyDollar className="w-12 h-12 text-indigo-500 p-2 bg-indigo-100 rounded-lg" />}
        value="$45,231"
        label="Total Revenue"
        change="+12%"
      />

      {/* Total Orders */}
      <StatCard
        icon={<HiOutlineShoppingCart className="w-12 h-12 text-green-500 p-2 bg-green-100 rounded-lg" />}
        value="3456"
        label="Total Orders"
        change="+8%"
      />

      {/* Total Customers */}
      <StatCard
        icon={<HiOutlineUserGroup className="w-12 h-12 text-blue-500 p-2 bg-blue-100 rounded-lg" />}
        value="1,234"
        label="Customers"
        change="-3%"
      />
    </div>
  );
};

export default DashboardStats;