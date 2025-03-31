import React from 'react'
import CountUp from 'react-countup';

const StatCard = ({ icon, value, label, change, prefix= "" }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        {icon}
        <span className="text-green-500 text-sm">{change}</span>
      </div>
      <h3 className="text-2xl font-bold mt-4">
        <CountUp start={0} end={value} duration={2.5} separator="," prefix={prefix} />
      </h3>
      <p className="text-gray-500">{label}</p>
    </div>
  )
}

export default StatCard