import React, { useContext } from 'react'
import { reserveContext } from '../context/reserveContext'

const Hero = () => {
  const {navigate}=useContext(reserveContext)
  return (
    <div className='relative flex items-center text-white  main h-screen w-full'>
      <div className='bg-gray-800 absolute inset-0 opacity-40 md:opacity-17 z-10 '>
        </div>
      <div className='sm:px-20 px-4 z-30'>
        <h2 className='font-bold text-4xl mb-4'>Welcome To <span className='text-orange-400'>Luxury Cafe</span></h2>
      <h1 className='mb-4 font-bold text-5xl sm:text-6xl'>Reserve Your Table</h1>
      <h1 className='mb-6 font-bold text-5xl sm:text-6xl'>& Order Your Meal</h1>
      <button onClick={()=>{navigate("/reserve")}} className='button cursor-pointer bg-linear-to-tr from-orange-700 font-semibold text-xl to-amber-400 px-6 py-3 rounded-lg'>Book a Table</button>
      </div>
    </div>
  )
}

export default Hero