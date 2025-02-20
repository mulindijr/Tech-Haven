import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiStar } from 'react-icons/fi';

const List = ({token}) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    }catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const removeProduct = async (id) => {
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
    }
  }

  useEffect(() => {
    fetchList();
  },[]);

  return (
    <>
      <div className='flex flex-col gap-2'>
        <div className='sticky top-[72px] z-10 bg-gray-100 p-2 shadow-md'>
          <p className='mb-2 mt-2 text-lg font-semibold'>All Products List</p>
          <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center border border-red-500 bg-gray-200 py-2 px-3'>
            <b>Image</b>
            <b>Name</b>
            <b>Brand</b>
            <b>Price</b>
            <b>Rating</b>
            <b className='text-center'>Action</b>
          </div>
        </div>
        {
          list.map((item, index) => (                          
            <div key={index} className='flex flex-col md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center border py-2 px-3 gap-2'>
              <img src = {item.imgURL} alt = {item.name} className='w-24 h-24 object-cover' />
              <p className='text-center md:text-start'>{item.name}</p>
              <p>{item.brand}</p>
              <p className='flex items-center'>{currency} {item.price}</p>
              <div className='flex items-center gap-1'>
                <span className="text-sm font-medium">{item.rating}</span>
                <FiStar className="text-yellow-400" />                
              </div>
              <div className='flex justify-center gap-2'>
                <button className='text-2xl text-green-500 hover:bg-gray-100 px-2 py-1 rounded' title='Edit'>
                  <FiEdit />
                </button>
                <button onClick={() => removeProduct(item._id)} className='text-2xl text-red-500 hover:bg-gray-100 px-2 py-1 rounded' title='Delete'>
                  <FiTrash2 />
                </button>
              </div>
            </div>            
          ))
        }
      </div>
    </>
  )
}

export default List
