import React from 'react';
import DashboardStats from './dashboard/DashboardStats';
import SalesChart from './dashboard/SalesChart';
import RecentOrders from './dashboard/RecentOrders';
import TopProducts from './dashboard/TopProducts';

const Dashboard = ({token}) => {
  return (
    <div className="pt-4">
      <DashboardStats token={token}/>
      <SalesChart />

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentOrders />
        <TopProducts />
      </div>
    </div>
  );
};

export default Dashboard;