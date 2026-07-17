import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendurl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {
  const [list,setlist]=useState([])

  const fetchlist=async ()=>{
    try{
    const response =await axios.get(backendurl+"/api/menu/list")
    console.log(response.data)
    console.log(response.data.items)
    if(response.data.success){
      setlist(response.data.items)
    }
    else{
      toast.error(response.data.message)
    }
  }catch(error){
    console.log(error)
    toast.error(error.message)
  }
  }

  const removeproduct=async (id)=>{
    try{
      const  response= await axios.post(backendurl+"/api/menu/remove",{id},{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        await fetchlist()
      }
      else{
        toast.error(response.data.message)
      }
    }catch(error){
      console.log(error)

    }
    
  }

  useEffect(()=>{
    fetchlist();
  },[])
  return (
   <>
   <p className='mb-2'>All Items List</p>
   <div className='flex flex-col gap-2'>
  {/* list tabl title */}
  <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-amber-600 text-white items-center py-1 px-2 border font-medium  text-md'>
    <b>Image</b>
    <b>Name</b>
    <b>Category</b>
    <b>Price</b>
    <b className='text-center'>Action</b>
  </div>
  {/* Product list */}
  {list.map((item,index)=>(
    <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
    <img className='w-12' src={item.image[0]} alt="" />
    <p>{item.name}</p>
    <p>{item.category}</p>
    <p>{currency}{item.price}</p>
    <p onClick={()=>{removeproduct(item._id)}} className='text-right md:text-center cursor-pointer text-lg'>X</p>
    </div>
  ))}
   </div>
   </>
  )
}

export default List