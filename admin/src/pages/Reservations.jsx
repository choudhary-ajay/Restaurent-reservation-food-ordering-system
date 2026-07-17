import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendurl, currency } from '../App'
import { toast } from 'react-toastify'

const Reservations = ({token}) => {
  const [list,setlist]=useState([])
  const [expired,setexpired]=useState([])
  const [pending,setpending]=useState([])


  const fetchreservations = async () => {
    if (!token) {
      return null
    }
    try {
      const response = await axios.post(backendurl +"/api/reservation/allreservations", {}, { headers: { token } })
      if (response.data.success) {
      await setlist(response.data.reservations)

      const currentTime= Date.now()

        response.data.reservations.forEach((item)=>{
          const time=item.time.split("-")[1].trim()
          const itemTime=new Date(`${item.date} ${time}`).getTime()

          if(currentTime>itemTime){
            expired.push(item)
          }
          else{
            pending.push(item)
          }
        })
      


      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error.message)

    }
  }

  

  const removereservation=async (id)=>{
    try{
      const  response= await axios.post(backendurl+"/api/reservation/remove",{id},{headers:{token}})
      if(response.data.success){
        toast.success("Reservation removed")
        await fetchreservations()
      }
      else{
        toast.error(response.data.message)
      }
    }catch(error){
      console.log(error)

    }
    
  }

  useEffect(()=>{
    fetchreservations();
  },[])
  return (
   <>
   <p className='mb-2'>All Reservations</p>
   <div className='flex flex-col gap-2'>
  {/* list tabl title */}
  <div className='hidden md:grid grid-cols-[3fr_2fr_2fr_1fr_1fr] items-center py-1 px-2 border bg-amber-600 text-white font-medium text-md'>
    <b>Name</b>
    <b>Date</b>
    <b>Time</b>
    <b className='text-center'>Guests</b>
    <b className='text-center'>Action</b>
  </div>
  {/* Product list */}
  {pending.map((item,index)=>(
    <div className='grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_1fr] md:grid-cols-[3fr_2fr_2fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
    <p>{item.name}</p>
    <p>{item.date}</p>
    <p>{item.time}</p>
    <p className='text-center'>{item.guests}</p>
    <p onClick={()=>{removereservation(item._id)}} className='text-right md:text-center cursor-pointer text-lg'>X</p>
    </div>
  ))}

     <p className='mb-2 mt-10'>Expired Reservations</p>
   {expired.map((item,index)=>(
    <div className='grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_1fr] md:grid-cols-[3fr_2fr_2fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
    <p>{item.name}</p>
    <p>{item.date}</p>
    <p>{item.time}</p>
    <p className='text-center'>{item.guests}</p>
    <p onClick={()=>{removereservation(item._id)}} className='text-right md:text-center cursor-pointer text-lg'>X</p>
    </div>
  ))}
   </div>
   </>
  )
}

export default Reservations