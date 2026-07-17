import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { reserveContext } from '../context/reserveContext'
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const {token,setToken,getcartcount}=useContext(reserveContext)
  const [show,setshow]=useState(false)

  
  return (
    <nav className='flex justify-between items-center py-5 px-4 sm:px-10 text-xl bg-black text-white'>
      {show?(<RxCross2 onClick={()=>{setshow(false)}}  className='text-4xl md:hidden'/>):( <GiHamburgerMenu onClick={()=>{setshow(true)}} className='text-4xl md:hidden' />)}
       <Link className='md:w-51.25' to={"/"}><h1 className='font-bold md:text-4xl text-3xl '>Luxury<span className='text-orange-400'>Cafe</span></h1></Link>
        <ul className={`md:flex ${show?"left-4":"-left-full"} absolute md:static gap-5 z-40 top-20  bg-black md:bg-transparent p-4 md:p-0`}> 
            <NavLink className='' to="/" ><p className='font-bold  hover:text-orange-400 cursor-pointer'>Home</p>
            <hr className='w-full hidden border-none h-[1.5px] bg-orange-400 '></hr>
            </NavLink>
             <NavLink className='' to="/menu" ><p className='font-bold  hover:text-orange-400 cursor-pointer'>Menu</p>
             <hr className='w-full hidden border-none h-[1.5px] bg-orange-400 '></hr>
            </NavLink>
             <NavLink className='' to="/reserve" ><p className='font-bold hover:text-orange-400 cursor-pointer'>Reserve</p>
             <hr className='w-full hidden border-none h-[1.5px] bg-orange-400 '></hr>
            </NavLink> 
             <NavLink className='' to="/contact" ><p className='font-bold hover:text-orange-400 cursor-pointer'>Contact</p>
             <hr className='w-full hidden border-none h-[1.5px] bg-orange-400 '></hr>
            </NavLink>
        </ul>
        {token ? (<div className='flex md:w-51.25 sm:gap-4 gap-2 justify-end items-center relative '>
          <div className='group'><img className='' src={assets.profile_icon} alt="" />
          {token && <div className='group-hover:block hidden absolute dropdown-menu z-40 top-8 right-0 pt-4 '>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-amber-300 text-black rounded'>
                         <NavLink to={"/orders"}><p className='cursor-pointer hover:text-white'>My Orders</p></NavLink>
                        <NavLink to={"/myreservation"}><p className='cursor-pointer hover:text-white'>Reservation</p></NavLink>
                        <p onClick={()=>{setToken(""), localStorage.removeItem("token")}}  className='cursor-pointer hover:text-white'>Log out</p>
                    </div>
                </div>}</div>
           <Link className='relative' to={"/cart"}> <img className="" src={assets.cart} alt="" />
           <p className='bg-white text-center text-black rounded-full w-4 leading-4 aspect-square text-[10px] absolute right-[3px] bottom-[2px] '>{getcartcount()}</p></Link>
        </div>):(<div className='md:w-51.25 flex justify-end'><Link to={'/login'} className='button bg-linear-to-tr from-orange-700 font-semibold text-base md:text-xl to-amber-400 px-5 py-2 rounded-lg'>Login</Link></div>)}
        
    </nav>
  )
}

export default Navbar