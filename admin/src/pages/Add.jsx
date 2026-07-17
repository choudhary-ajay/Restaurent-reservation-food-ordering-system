import React, { useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import axios from "axios"
import {backendurl} from "../App"
import { toast } from 'react-toastify'

const Add = ({token}) => {
    const [image1,setimage1]=useState(false)
   
    const [name,setname]=useState("")
    const [description,setdescription]=useState("")
    const [category,setcategory]=useState("Spaghetti")
    const [price,setprice]=useState("")
    

    const onsubmithandler=async (e)=>{
        e.preventDefault()
        try{
            const formdata=new FormData()

            formdata.append("name",name)
            formdata.append("description",description)
            formdata.append("price",price)
            formdata.append("category",category)
    
            image1 && formdata.append("image1",image1)

            const response=await axios.post(backendurl+"/api/menu/add",formdata,{headers:{token}})

            if(response.data.success){
            toast.success(response.data.message)
            
            setname("")
            setdescription("")
            setprice("")

            setimage1(false)
            }
            else{
                toast.error(response.data.message)
            }

        } catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }
  return (
    <form onSubmit={onsubmithandler} className='flex flex-col w-full items-start gap-3'>
        <div>
            <p className='mb-2 '>Upload Image</p>
            <div className='flex gap-2'>
                <label htmlFor="image1">
                    <img className='w-20' src={image1 ? URL.createObjectURL(image1) :assets.upload_area} alt="" />
                    <input  onChange={(e)=>{setimage1(e.target.files[0])}} type="file" id='image1' hidden />
                </label>
            </div>
        </div>
        <div className='w-full'>
            <p className='mb-2'>Item Name</p>
            <input value={name} onChange={(e)=>{setname(e.target.value)}} className='w-full max-w-[500px] px-3 py-2' type="text" required placeholder='Type here'/>
        </div>
        <div className='w-full'>
            <p className='mb-2'>Item Description</p>
            <textarea value={description} onChange={(e)=>{setdescription(e.target.value)}} className='w-full max-w-[500px] px-3 py-2' type="text" required placeholder='Write Description here'/>
        </div>
        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            <div>
                <p className='mb-2'>Item Category</p>
                <select onChange={(e)=>{setcategory(e.target.value)}} className='px-3 py-2 w-full'>
                    <option value="Spaghetti">Spaghetti</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Rice">Rice</option>
                    <option value="Noodles">Noodles</option>
                    <option value="Chicken">Chicken</option>
                    <option value="Drinks">Drinks</option>
                     <option value="Chappati">Chappati</option>
                      <option value="Veg Curries">Veg Curries</option>
                </select>
            </div>
           
            <div>
                <p className='mb-2'>Item Price</p>
                <input value={price} onChange={(e)=>{setprice(e.target.value)}} className='px-3 py-2 w-full sm:w-[120px]' type="number" placeholder='25' />
            </div>
        </div>
        
       
        <button type='submit' className='w-28 cursor-pointer bg-amber-600 text-white py-3 mt-4'>ADD</button>
    </form>
  )
}

export default Add