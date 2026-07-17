import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'
const Sidebar = () => {
  return (
    <div className='w-[18%] border-r-2 min-h-screen'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] md:pl-[4%] lg:pl-[20%]  text-[15px]'>
            <NavLink to={'/add'} className='flex font-medium gap-3 items-center border border-gray-300 justify-center md:justify-start  border-r-0 px-3 py-2 rounded-l'>
                <img className='w-5 h-5' src={assets.add_icon} alt="" />
                <p className='hidden md:block'>Add Items</p>
            </NavLink>
             <NavLink to={'/list'} className='flex font-medium gap-3 items-center border border-gray-300 justify-center md:justify-start border-r-0 px-3 py-2 rounded-l'>
                <img className='w-5 h-5' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>List Items</p>
            </NavLink>
             <NavLink to={'/orders'} className='flex font-medium gap-3 items-center border border-gray-300 justify-center md:justify-start border-r-0 px-3 py-2 rounded-l'>
                <img className='w-5 h-5' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>Orders</p>
            </NavLink>
             <NavLink to={'/reservations'} className='flex font-medium gap-3 items-center border border-gray-300 justify-center md:justify-start border-r-0 px-3 py-2 rounded-l'>
                <img className='w-5 h-5' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>Reservations</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar