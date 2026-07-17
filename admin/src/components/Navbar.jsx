import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between px-[4%] py-2 '>
      <Link className='md:w-51.25' to={"/"}><h1 className='font-bold md:text-4xl text-3xl '>Luxury<span className='text-orange-400'>Cafe</span></h1></Link>
        <button onClick={()=>{setToken("")}} className='bg-gray-600 text-white text-xs sm:text-sm px-5 sm:px-7 sm:py-2 py-2 rounded-md'>Log Out</button>
    </div>
  )
}

export default Navbar