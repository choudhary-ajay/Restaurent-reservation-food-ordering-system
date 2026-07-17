import React from 'react'
import { NavLink } from "react-router-dom"
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";

const Contact = () => {
    return (
        <div className=' text-gray-600 bg-white sm:max-w-5xl mb-10  max-w-fit mx-auto sm:mx-10   lg:mx-auto mt-10  p-8 rounded-lg shadow-md space-y-10'>
            <h2 className='text-5xl font-bold'>Contact Us</h2>
            <div className='md:grid space-y-10  md:grid-cols-2'>
            <div className='text-lg font-bold'>
                <h3>Address</h3>
                <p>123,national highway indore </p>
            </div>
            <div className='text-lg font-bold'>
                <h3>Open Time</h3>
                <p>Mon - Fri: 11:00 AM - 10:00 PM</p>
                <p> Sat - Sun: 09:00 AM - 11:00 PM</p>
            </div>
            <div className='text-lg font-bold'>
                <h3>Contact</h3>
                <p>Phone: 000-1344-533</p>
                <p>Email: LuxuryCafe@gmail.com</p>
            </div>
            <div className='text-lg font-bold mb-2'>
                <h3>Stay Connected</h3>
                <div className='text-white flex gap-4 mt-2'>
                    <NavLink to={'https://www.facebook.com/'} target='_blank'><FaFacebookSquare className='text-4xl text-red-500' /></NavLink>
                    <NavLink to={'https://www.x.com/'} target='_blank'> <FaXTwitter className='text-4xl text-red-500' /></NavLink>
                    <NavLink to={'https://www.instagram.com/'} target="_blank"> <FaInstagram className='text-4xl text-red-500' /></NavLink>
                    <NavLink to={'https://www.youtube.com/'} target='_blank'><IoLogoYoutube className='text-4xl text-red-500' /></NavLink>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Contact