import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { backendUrl, currency } from "../../App";
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar, FiRefreshCw } from 'react-icons/fi';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const periodOptions = [
  { value: 'day', label: 'Daily' },
  { value: 'week', label: 'Weekly' },
  { value: 'month', label: 'Monthly' }
];

const SalesChart = ({ token }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('day');
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date()
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
  
      const response = await axios.post(
        backendUrl + '/api/admin/sales-chart',
        {
          period,
          startDate: dateRange.start.toISOString(),
          endDate: dateRange.end.toISOString()
        },
        {
          headers: {
            'Content-Type': 'application/json',
            token
          }
        }
      );
  
      const { chartData } = response.data;
      setChartData(chartData);
    } catch (err) {
      console.error('Error fetching sales data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => {
    fetchData();
  }, [period, dateRange]);

  const formatChartData = () => {
    if (!chartData) return { labels: [], datasets: [] };

    const labels = chartData.map(item => item._id);
    const revenueData = chartData.map(item => item.totalRevenue);
    const orderData = chartData.map(item => item.orderCount);

    return {
      labels,
      datasets: [
        {
          label: 'Revenue',
          data: revenueData,
          borderColor: 'rgba(79, 70, 229, 1)',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          tension: 0.3,
          fill: true,
          yAxisID: 'y'
        },
        {
          label: 'Orders',
          data: orderData,
          borderColor: 'rgba(16, 185, 129, 1)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.3,
          borderDash: [5, 5],
          yAxisID: 'y1'
        }
      ]
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Revenue (Ksh)'
        },
        grid: {
          drawOnChartArea: false
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Orders'
        },
        grid: {
          drawOnChartArea: false
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h3 className="text-lg font-semibold mb-2 md:mb-0">Sales Overview</h3>
        
        <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-start">
          <div className="flex items-center space-x-2">
            <FiCalendar className="text-gray-500" />
            <DatePicker
              selected={dateRange.start}
              onChange={(date) => setDateRange({ ...dateRange, start: date })}
              selectsStart
              startDate={dateRange.start}
              endDate={dateRange.end}
              maxDate={dateRange.end}
              className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
            />
            <span className="hidden sm:inline">to</span>
            <DatePicker
              selected={dateRange.end}
              onChange={(date) => setDateRange({ ...dateRange, end: date })}
              selectsEnd
              startDate={dateRange.start}
              endDate={dateRange.end}
              minDate={dateRange.start}
              maxDate={new Date()}
              className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
            />
          </div>          
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {periodOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <button 
            onClick={fetchData}
            disabled={loading}
            className="flex items-center justify-center px-3 py-1 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors disabled:opacity-50"
          >
            <FiRefreshCw className={`mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      <div className="relative h-80">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-8 bg-indigo-200 rounded-full mb-2"></div>
              <p className="text-gray-500">Loading data...</p>
            </div>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-red-500 font-medium">Error loading chart data</p>
              <p className="text-sm text-gray-500 mt-1">{error}</p>
              <button 
                onClick={fetchData}
                className="mt-2 px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 text-sm"
              >
                Retry
              </button>
            </div>
          </div>
        ) : chartData && chartData.length > 0 ? (
          <Line data={formatChartData()} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-400">No data available for the selected period</p>
          </div>
        )}
      </div>

      {chartData && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-3 rounded-lg">
            <p className="text-sm text-indigo-600">Total Revenue</p>
            <p className="text-xl font-semibold">
              {currency} {chartData.reduce((sum, item) => sum + item.totalRevenue, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm text-green-600">Total Orders</p>
            <p className="text-xl font-semibold">
              {chartData.reduce((sum, item) => sum + item.orderCount, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-sm text-purple-600">Avg. Order Value</p>
            <p className="text-xl font-semibold">
              {currency} {(
                chartData.reduce((sum, item) => sum + item.totalRevenue, 0) / 
                chartData.reduce((sum, item) => sum + item.orderCount, 1)
              ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesChart;