import React, { useContext, useState } from 'react'
import { NavLink } from "react-router-dom"
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import axios from 'axios';
import { toast } from 'react-toastify';
import { reserveContext } from '../context/reserveContext';


const Reservstionform = () => {
    const { token, backendurl } = useContext(reserveContext)
    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "1"
    })

    const generatetimeslots = () => {
        const slots = []
        for (let hour = 9; hour < 20; hour++) {
            const starthour = hour % 12 === 0 ? 12 : hour % 12
            const startperiod = hour < 12 ? "AM" : "PM"

            const endhour = (hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12
            const endperiod = (hour + 1) < 12 ? "AM" : "PM"

            slots.push(`${starthour}:00 ${startperiod}-${endhour}:00 ${endperiod}`)
        }
        return slots
    }


    const handlechange = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value })
    }
    const handlesubmit = async (e) => {
        e.preventDefault()
        if (!token) {
            toast.error("Please Login for book Table")
        } else {
            if (formdata.name.trim() === "" || formdata.email.trim() === "" || formdata.phone.trim() === "" || formdata.date === "" ||
                formdata.time === "" || formdata.guests === "") {
                toast.error("All fields reqired")
                return
            }
            try {
                const res = await axios.post(backendurl + "/api/reservation/reserve", formdata, { headers: { token } })
                if (res.data.success) {
                    toast.success(res.data.message)
                    setformdata({
                        name: "",
                        email: "",
                        phone: "",
                        date: "",
                        time: "",
                        guests: "1"
                    })
                } else {
                    toast.error(res.data.message)
                }

            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    return (
        <div className='flex flex-col mb-4  w-full py-4 px-4 lg:px-12  '>
            <h1 className='sm:text-4xl mx-auto text-center text-3xl text-white font-bold mb-4'>Dine With Us-<span className='text-orange-600'>Reserve Now</span></h1>
            <h1 className='text-white sm:text-3xl text-2xl mx-auto mb-6 font-semibold '>Reserve Your Table</h1>
            <div className="grid gap-8 w-full max-w-6xl lg:grid-cols-3  mx-auto">
                <form className='lg:col-span-2 p-8 rounded-lg bg-white' action="">
                    <h2 className='text-xl font-semibold text-orange-600 mb-3'>RESERVE A TABLE</h2>
                    {/* <h1 className='lg:block hidden mx-auto text-center text-3xl text-white font-bold mb-4'>Dine With Us-<span className='text-orange-600'>Reserve Now</span></h1>
                   */}

                    <div className='grid md:grid-cols-2 gap-4'>
                        <div className='grid w-full gap-1.5 '>
                            <label className="font-bold" htmlFor=''>Full Name</label>
                            <input onChange={handlechange} required value={formdata.name} className='w-full border rounded-md focus:ring focus:ring-blue-400  p-3 mb-3' type="text" name='name' id='name' placeholder='Full Name' />
                        </div>
                        <div className='grid w-full gap-1.5 '>
                            <label className="font-bold" htmlFor=''>Email</label>
                            <input onChange={handlechange} required value={formdata.email} className='w-full border rounded-md focus:ring focus:ring-blue-400  p-3 mb-3' type="email" name='email' id='email' placeholder='Email' />
                        </div>
                        <div className='grid w-full gap-1.5 '>
                            <label className="font-bold" htmlFor=''>Phone Number</label>
                            <input onChange={handlechange} required value={formdata.phone} className='w-full border rounded-md focus:ring focus:ring-blue-400  p-3 mb-3' type="tel" name='phone' id='phone' placeholder='Phone Number' />
                        </div>
                        <div className='grid w-full gap-1.5 '>
                            <label className="font-bold" htmlFor=''>Date</label>
                            <input onChange={handlechange} required value={formdata.date} className='w-full border rounded-md focus:ring focus:ring-blue-400  p-3 mb-3' type="date" name='date' id='date' placeholder='' />
                        </div>
                        <div className='grid w-full gap-1.5 '>
                            <label className="font-bold" htmlFor=''>Reservation Time</label>
                            <select onChange={handlechange} value={formdata.time} required className='w-full border rounded-md focus:ring focus:ring-blue-400  p-3 mb-3' name='time' >
                                <option value="">Select Time</option>
                                {generatetimeslots().map((slot, index) => (<option value={slot} key={index}>{slot}</option>))}
                            </select>
                        </div>
                        <div className='grid w-full gap-1.5 '>
                            <label className="font-bold" htmlFor=''>Number Of Guests</label>
                            <select onChange={handlechange} required value={formdata.guests} className='w-full border rounded-md focus:ring focus:ring-blue-400  p-3 mb-3' name="guests" id="">
                                {[...Array(10).keys()].map((i) => (<option key={i} value={i + 1}>{i + 1} Guests</option>))}
                            </select>
                        </div>

                    </div>
                    <button type='submit' onClick={(e) => { handlesubmit(e) }} className='w-full text-white border rounded-md mt-5 bg-linear-to-tr from-orange-700 font-semibold text-xl to-amber-400  p-3'>Reserve Now</button>
                </form>
                <div className=' text-gray-600 bg-white md:grid grid-cols-2 lg:block md:w-full  p-8 rounded-lg shadow-md space-y-10'>
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

        </div>
    )
}

export default Reservstionform