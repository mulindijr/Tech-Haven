import { useEffect, useState } from 'react'
import { 
  FiUsers, FiTrendingUp, FiZap, FiAlertCircle, 
  FiSearch, FiEye, FiEdit2, FiTrash2,
  FiMapPin, FiPhone, FiCalendar
} from 'react-icons/fi'
import { AiOutlineUser } from "react-icons/ai";
import { backendUrl } from '../App' 
import axios from 'axios'
import CustomersSkeleton from './CustomersSkeleton';

const Customers = ({token}) => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.post( backendUrl + '/api/admin/customers', {}, { headers: { token }, });
    
        const data = response.data;
    
        if (data.success) {
          setCustomers(data.customers);
        } else {
          throw new Error(data.message || 'Failed to fetch customers');
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };      

    fetchCustomers()
  }, [])

  const filteredCustomers = customers.filter(customer => {
    const searchLower = searchTerm.toLowerCase()
    return (
      (customer.firstName || '').toLowerCase().includes(searchLower) ||
      (customer.lastName || '').toLowerCase().includes(searchLower) ||
      (customer.email || '').toLowerCase().includes(searchLower) ||
      (customer.address?.city || '').toLowerCase().includes(searchLower) ||
      (customer.address?.country || '').toLowerCase().includes(searchLower)
    )
  })  

  if (loading) {
    return (
      <CustomersSkeleton />
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiAlertCircle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">Error fetching customers: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
        </div>
        <div className="mt-4 md:mt-0 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <FiUsers className="text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Customers</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{customers.length}</div>
                </dd>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <FiTrendingUp className="text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">New This Month</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">
                    {customers.filter(c => {
                      const custDate = new Date(c.createdAt)
                      const monthAgo = new Date()
                      monthAgo.setMonth(monthAgo.getMonth() - 1)
                      return custDate > monthAgo
                    }).length}
                  </div>
                </dd>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <FiZap className="text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Active Today</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">0</div>
                </dd>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <FiAlertCircle className="text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Need Follow-up</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">0</div>
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customers List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Customer List</h3>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="text-center py-12">
            <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search term' : 'No customers in the system yet'}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <li key={customer._id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {
                          customer.profilePic ? (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={customer.profilePic}
                              alt="profile"
                            />
                          ) : (
                            <AiOutlineUser className="h-10 w-10 text-gray-400 border rounded-full border-gray-300" />
                          )
                        }
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {customer.firstName} {customer.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FiEye />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FiEdit2 />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <div className="mr-6 flex items-center text-sm text-gray-500">
                        <FiMapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {customer.address?.city || 'N/A'}, {customer.address?.country || 'N/A'}
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <FiPhone className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {customer.address?.phone || 'N/A'}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <FiCalendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      Joined on {new Date(customer.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Customers