import React from 'react';
import DashboardStats from './dashboard/DashboardStats';
import SalesChart from './dashboard/SalesChart';
import RecentOrders from './dashboard/RecentOrders';
import TopProducts from './dashboard/TopProducts';

const Dashboard = ({token}) => {
  return (
    <div className="pt-4 pb-16 lg:pb-0">
      <DashboardStats token={token}/>
      <SalesChart token={token}/>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentOrders token={token}/>
        <TopProducts token={token}/>
      </div>
    </div>
  );
};

export default Dashboard;