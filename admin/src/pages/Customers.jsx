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
import { toast } from 'react-toastify'

const Customers = ({token}) => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [customerToDelete, setCustomerToDelete] = useState(null)

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
    <>
      <div className="container mx-auto px-1 py-8 pb-16 lg:pb-0">
        {/* Header and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
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
                        const custDate = new Date(c.createdAt);
                        const currentMonth = new Date().getMonth(); // Get the current month
                        const currentYear = new Date().getFullYear(); // Get the current year
                        return custDate.getMonth() === currentMonth && custDate.getFullYear() === currentYear; // Check if the customer was created this month and this year
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

        <div className="mb-4 md:mt-0 flex justify-end">
          <div className="relative w-full sm:max-w-xs">
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
                  <div className="flex flex-wrap items-center justify-between">
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
                    <div className="flex space-x-2 my-4 sm:my-0">
                      <button onClick={() => {toast.info("This function will be implemented soon!")}} className="text-blue-600 hover:text-blue-900">
                        <FiEye />
                      </button>
                      <button onClick={() => {toast.info("This function will be implemented soon!")}} className="text-green-600 hover:text-green-900">
                        <FiEdit2 />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-700"                      
                        onClick={() => setCustomerToDelete(customer._id)}
                      >
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
    
      {/* Delete Confirmation Modal */}
      {customerToDelete && (
        <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={() => setCustomerToDelete(null)}
      >
        <div
          className="bg-white rounded-lg shadow-lg p-6"
          onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside it
        >
          <h2 className="text-lg font-semibold mb-4">Delete Customer</h2>
          <p>Are you sure you want to delete this customer and all their orders?</p>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
              onClick={() => setCustomerToDelete(null)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              // onClick={async () => {
              //   try {
              //     const response = await axios.post(
              //       backendUrl + "/api/admin/delete-customer",
              //       { customerId: customerToDelete },
              //       { headers: { token } }
              //     );
              
              //     if (response.data.success) {
              //       toast.success("Customer deleted successfully");
              //       setCustomers((prev) =>
              //         prev.filter((c) => c._id !== customerToDelete)
              //       );
              //       setCustomerToDelete(null);
              //     } else {
              //       toast.error(response.data.message || "Failed to delete customer");
              //     }
              //   } catch (error) {
              //     console.error("Error deleting customer:", error);
              //     toast.error("Error deleting customer");
              //   }
              // }}
              onClick={() => toast.info("Customer deletion is currently disabled to prevent removal of test customer data.")}
            >
              Yes, Delete
            </button>
          </div>
        </div>
        </div>
      )}
    </>
  )
}

export default Customers