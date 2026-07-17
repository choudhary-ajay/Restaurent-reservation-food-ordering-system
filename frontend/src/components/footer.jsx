import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Footer = () => {
    return (<div className='max-w-6xl mx-4 lg:mx-12 xl:mx-auto'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    {/* <img src={} alt="" className='mb-5 w-32' /> */}
                     <Link className='md:w-51.25' to={"/"}><h1 className='font-bold md:text-4xl text-white text-3xl mb-5 '>Luxury<span className='text-orange-400'>Cafe</span></h1></Link>
                    <p className='w-full md:w-2/3 text-white'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas maxime repellendus consectetur perferendis voluptate et amet earum nam perspiciatis vitae.</p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col  gap-1 text-white'>
                       <Link  to={"/"}> <li>Home</li></Link>
                       <Link to={'/menu'}> <li>Menu</li></Link>
                      <Link to={"/reserve"}>  <li>Reserve Table</li></Link>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-white'>
                        <li>+91 87554987575</li>
                        <li>luxurycafe@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-5 text-sm text-white text-center'>Copyright 2026 &copy;LuxuryCafe.com -All rights reserved</p>
            </div>
        </div>
    )
}

export default Footer