import React, { useContext } from 'react'
import { reserveContext } from '../context/reserveContext'
import { NavLink, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'


const Menuitem = () => {
  const { product,addtocart } = useContext(reserveContext)
  const {id}=useParams()
  const [category,setcategory]=useState("")
  const [related,setrelated]=useState([])

  const productitem=product.filter((item)=>item._id===id)
 

  const relatedItems=async()=>{
     setcategory(productitem[0].category)
     await setrelated(product.filter((item)=>item.category===category).slice(0,3))
  }
  useEffect(()=>{
    relatedItems()
  },[id,category])
 
  return (
    <div className='max-w-6xl mb-5 flex flex-col lg:flex-row gap-14 mt-10  mx-4 sm:mx-7  lg:mx-auto '>
      <div className='sm:max-w-[680px] lg:max-w-full sm:mx-auto lg:ml-4 max-w-full rounded-md hover:scale-105 transition ease-in-out bg-white'>
        <div className='sm:h-[500px] lg:h-[40vh]'>
          <img className='h-full w-full object-cover object-center' src={productitem[0].image} alt="" />
        </div>
        <div className='p-4'>
          <h3 className='text-2xl font-bold text-orange-600 mb-3'>{productitem[0].name}</h3>
          <p className='text-blue-400 text-semibold'>{productitem[0].category}</p>
          <p className='text-gray-700 border-b border-gray-700 pb-2'>{productitem[0].description}</p>
          <div className='flex mt-4 justify-between items-center'>
            <p className='font-bold text-lg'>₹{productitem[0].price}</p>
            <button onClick={(e)=>{addtocart(e,productitem[0]._id)}} className='border font-bold rounded-md border-black px-3 py-2 hover:bg-orange-200 cursor-pointer active:bg-orange-400'>Add to Cart</button>
          </div>

        </div>
      </div>
      <div className='w-full mr-4'>
        <h1 className='text-3xl text-white mb-4 font-bold'>Related Items</h1>
        <div className='flex lg:pl-5 flex-col gap-2'>
          {related.map((item)=> <NavLink to={`/menu/${item._id}`} key={item._id} className='flex hover:scale-105 transition ease-in-out items-center gap-6 p-4 bg-white rounded-xl shadow-sm'>
                <img src={item.image} alt="" className='h-30 w-30 rounded-full object-cover' />
                <div className='flex-1'>
                    <div className='flex justify-between items-center'>
                        <h3 className='sm:text-lg text-base font-semibold text-orange-600'>{item.name}</h3>
                        
                    </div>
                        <p className=' text-sm mt-1'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                        <div className='flex mt-2 justify-between'>
                          <span className='text-lg font-bold text-black'>
                                ₹{item.price}
                        </span>
                            <button  className='border-gray-600 border cursor-pointer font-semibold  px-3 rounded-sm text-sm py-0.5'>Add to cart</button>
                        </div>
                </div>
            </NavLink>)}
           
            
        </div>

      </div>
    </div>
  )
}

export default Menuitem