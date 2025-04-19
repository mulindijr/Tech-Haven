import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import { HiOutlineCurrencyDollar, HiOutlineShoppingCart, HiOutlineUserGroup } from 'react-icons/hi';
import { backendUrl } from '../../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const DashboardStats = ({token}) => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
  });

  const fetchDashboardStats = async () => {

    try {

      const response = await axios.post(backendUrl + '/api/admin/stats', {}, { headers: { token } });
      
      if (response.data.success) {
        setStats({
          totalRevenue: response.data.totalRevenue,
          totalOrders: response.data.totalOrders,
          totalCustomers: response.data.totalCustomers,
        });
      }
    } catch (error) {
      toast.error('Error fetching dashboard stats');
    }

  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Revenue */}
      <StatCard
        icon={<HiOutlineCurrencyDollar className="w-12 h-12 text-indigo-500 p-2 bg-indigo-100 rounded-lg" />}
        value={stats.totalRevenue}
        label="Total Revenue"
        change="+12%"
        prefix="Ksh "
      />

      {/* Total Orders */}
      <StatCard
        icon={<HiOutlineShoppingCart className="w-12 h-12 text-green-500 p-2 bg-green-100 rounded-lg" />}
        value={stats.totalOrders.toLocaleString()}
        label="Total Orders"
        change="+8%"
      />

      {/* Total Customers */}
      <StatCard
        icon={<HiOutlineUserGroup className="w-12 h-12 text-blue-500 p-2 bg-blue-100 rounded-lg" />}
        value={stats.totalCustomers.toLocaleString()}
        label="Customers"
        change="-3%"
      />
    </div>
  );
};

export default DashboardStats;