import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiStar } from 'react-icons/fi';

const List = () => {

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

  useEffect(() => {
    fetchList();
  },[]);

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        <div className='grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-200 py-2 px-3 gap-2'>
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Rating</b>
          <b className='text-center'>Action</b>
        </div>
        {
          list.map((item, index) => (                          
            <div key={index} className='grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] py-2 px-3 gap-2'>
              <img src = {item.imgURL} alt = {item.name} className='w-12 h-12 object-cover' />
              <p>{item.name}</p>
              <p className='flex items-center'>{currency} {item.price}</p>
              <div className='flex items-center gap-1'>
                <span className="text-sm font-medium">{item.rating}</span>
                <FiStar className="text-yellow-400" />                
              </div>
              <div className='flex justify-center gap-2'>
                <button className='text-2xl text-green-500 hover:text-green-600 px-2 py-1 rounded' title='Edit'>
                  <FiEdit />
                </button>
                <button className='text-2xl text-red-500 hover:text-red-600 px-2 py-1 rounded' title='Delete'>
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
