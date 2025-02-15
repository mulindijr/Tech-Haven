import React from 'react'

const Navbar = ({setToken}) => {
  return (
    <div className='flex justify-between items-center px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-4'>
        <h1 className='text-xl font-bold cursor-pointer'>
            Tech<span className='text-red-500'>Haven</span>
        </h1>

        <button onClick={() => setToken('')} className='bg-red-400 text-white px-4 py-2 rounded-full'>
            Logout
        </button>
    </div>
  )
}

export default Navbar