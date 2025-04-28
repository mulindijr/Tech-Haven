import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiStar, FiX } from 'react-icons/fi';
import Add from './Add'
import ListSkeleton from './ListSkeleton';

const List = ({token}) => {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingProduct, setUpdatingProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.post(backendUrl + '/api/admin/list-products', {}, {headers:{token}});
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    }catch (error) {
      console.log(error);
      toast.error(error.message);
    }finally {
      setLoading(false);
    }
  }

  const removeProduct = async (id) => {
    if (!id) return;
    try {
      const response = await axios.post(backendUrl + '/api/product/remove/', {id}, {headers:{token}});

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    }catch (error) {
      console.log(error);
      toast.error(error.message);
    }finally {  
      setDeleteProductId(null);
    }
  }

  // Implement edit functionality
  const handleEdit = (product) => {
    setUpdatingProduct(product);
  }

  const handleUpdateComplete = () => {
    setUpdatingProduct(null);
    fetchList();
  }

  useEffect(() => {
    fetchList();
  },[]);

  return (
    <>
      <div className='flex flex-col gap-2'>
        <div className='sticky top-[72px] z-10 bg-gray-100 p-2 shadow-md'>
          <p className='mb-2 mt-2 text-lg font-semibold'>All Products List</p>
          <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr] items-center border border-red-500 bg-gray-200 py-2 px-3'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Brand</b>
            <b>Price</b>
            <b>Rating</b>
            <b className='text-center'>Action</b>
          </div>
        </div>
        {loading ? (
          <ListSkeleton />
        ) : list.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg font-semibold">No products found</p>
          </div>
        ): (
          <>
            {
              list.map((item, index) => (                          
                <div key={index} className='flex flex-col md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr] items-center border py-2 px-3 gap-2'>
                  <img src = {item.imgURL} alt = {item.name} className='w-24 h-24 object-cover' />
                  <p className='text-center md:text-start'>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{item.brand}</p>                  
                  <p className='flex items-center'>{currency} {item.price}</p>
                  <div className='flex items-center gap-1'>
                    <span className="text-sm font-medium">{item.rating}</span>
                    <FiStar className="text-yellow-400" />                
                  </div>
                  <div className='flex justify-center gap-2'>
                    <button onClick={() => handleEdit(item)} className='text-2xl text-green-500 hover:bg-gray-100 px-2 py-1 rounded' title='Edit'>
                      <FiEdit />
                    </button>
                    <button onClick={() => setDeleteProductId(item._id)} className='text-2xl text-red-500 hover:bg-gray-100 px-2 py-1 rounded' title='Delete'>
                      <FiTrash2 />
                    </button>
                  </div>
                </div>            
              ))
            } 
          </>                   
        )}
      </div>

      {/* Edit Modal: Render the Add component in edit mode */}
      {updatingProduct && (
        <div onClick={() => setUpdatingProduct(null)} className='bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center z-50'>
          <div onClick={(e) => e.stopPropagation()} className='bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-auto'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-bold'>Update Product</h2>
              <FiX onClick={() => setUpdatingProduct(null)} size={24}  style={{ strokeWidth: 3 }} className='cursor-pointer text-red-500 hover:bg-gray-100'/>
            </div>
            <Add 
              token={token}
              product={updatingProduct}
              onUpdateComplete = {handleUpdateComplete}
            />
          </div>
        </div>
      )
      }

      {/* Delete Confirmation Modal */}
      {deleteProductId && (
        <div role='dialog' aria-modal='true' onClick={() => setDeleteProductId(null)} className="bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300">
          <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm">
            <h2 className="text-lg font-semibold text-center">
              Are you sure you want to delete this product?
            </h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => removeProduct(deleteProductId)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteProductId(null)}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default List
