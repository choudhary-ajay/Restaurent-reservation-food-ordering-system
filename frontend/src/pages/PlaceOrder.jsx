import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import { reserveContext } from '../context/reserveContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
    const {cartItems,product,getCartTotal,navigate,backendurl,token,setcartItems}=useContext(reserveContext)
    const [method,setmethod]=useState("cod")

    const [formdata,setformdata]=useState({
        firstname:"",
        lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
    })

    const onchangehandler=(event)=>{
        const name=event.target.name
        const value=event.target.value

        setformdata((data)=>({...data,[name]:value}))
        
    }

    const  onsubmithandler=async (e)=>{
        e.preventDefault()

        try{
            let orderItems=[]

            for(let item in cartItems){
                if(cartItems[item]>0){
                    let iteminfo=structuredClone(product.find(data=>data._id===item))
                    if(iteminfo){
                        iteminfo.quantity=cartItems[item]
                         orderItems.push(iteminfo)
                    }
                }
            }

            let orderdata={
                address:formdata,
                items:orderItems,
                amount:getCartTotal()+10
            }

            switch(method){
                case "cod":
                    const response=await axios.post(backendurl+"/api/order/cod",orderdata,{headers:{token}})
                    if(response.data.success){
                        setcartItems({})
                        navigate("/orders")
                    }else{
                        toast.error(response.data.message)
                    }
                    break;

                     case "stripe":
            const responseStripe=await axios.post(backendurl+"/api/order/stripe",orderdata,{headers:{token}})
            if(responseStripe.data.success){
              const {session_url}=responseStripe.data
              window.location.replace(session_url)
            }
            break

            }
            console.log(orderdata)
        }catch(error){

        }
    }

    return (
        <form onSubmit={onsubmithandler} className='max-w-6xl mx-auto mb-10 py-20 flex justify-between items-center border-2 border-t-white' >
            <div className='text-white flex flex-col gap-5'>
                <h1 className='text-3xl flex items-center font-bold mb-3'>Delivey Information<span className='h-0.5  inline-block mx-2 w-12 bg-white'></span></h1>

                <div className='flex gap-5'>
                    <input onChange={onchangehandler} required className='w-full border border-gray-300 px-5 py-2 rounded-sm' name='firstname' type="text" placeholder='First Name' />
                    <input onChange={onchangehandler}  required className='w-full border border-gray-300 px-5 py-2 rounded-sm' type="text" name='lastname' placeholder='Last Name' />
                </div>
                <input onChange={onchangehandler}  required className='w-full border border-gray-300 px-5 py-2 rounded-sm' type="email" name='email' placeholder='Email Address' />
                <input onChange={onchangehandler}  required className='w-full border border-gray-300 px-5 py-2 rounded-sm' type="text" name="street" id="" placeholder='Street' />
                <div className='flex gap-5'>
                    <input onChange={onchangehandler} required className='w-full border border-gray-300 px-5 py-2 rounded-sm' type="text" name='city' placeholder='City' />
                    <input onChange={onchangehandler} required className='w-full border border-gray-300 px-5 py-2 rounded-sm' type="text" name='state' placeholder='State' />
                </div>
                <div className='flex gap-5'>
                    <input onChange={onchangehandler}  required className='w-full border border-gray-300 px-5 py-2 rounded-sm' type="text" name='zipcode' placeholder='Zipcode' />
                    <input onChange={onchangehandler}  required className='w-full border border-gray-300 px-5 py-2 rounded-sm' type="text" name='country' placeholder='Country' />
                </div>
                <input onChange={onchangehandler}  required className='w-full border border-gray-300 px-5 py-2 rounded-sm' type="number" name='phone' placeholder='Phone Number' />
            </div>

            <div className="right min-w-80">
                <div className='text-white'>
                    <CartTotal />
                </div>
                <div className='text-white my-10 '>
                    <h2 className='text-2xl flex items-center font-bold mb-3'>Payment Method<span className='h-0.5  inline-block mx-2 w-12 bg-white'></span></h2>
                    <div className='flex gap-5'>
                        <div onClick={()=>{setmethod("cod")}} className={`flex items-center px-2 py-3 border-2 border-white gap-4`}>
                            <div className={`rounded-full ${method==="cod"?"bg-green-400":""} border-2 border-white w-5 h-5`}></div>
                            <p className='text-gray-300 text-[14px] pr-3 '>CASH ON DELIVERY</p>
                        </div>
                        {/* <div  onClick={()=>{setmethod("razorpay")}} className={`flex  items-center px-2 py-3 border-2 border-white gap-4`}>
                            <div className={`rounded-full ${method==="razorpay"?"bg-green-400":""} border-2 border-white w-5 h-5`}></div>
                            <p className='text-gray-300 text-[14px] pr-3'>RAZORPAY</p>
                        </div> */}
                        <div  onClick={()=>{setmethod("stripe")}} className={`flex  items-center px-2 py-3 border-2 border-white gap-4`}>
                            <div className={`rounded-full ${method==="stripe"?"bg-green-400":""} border-2 border-white  w-5 h-5`}></div>
                            <p className=' text-gray-300 text-[14px] pr-3'>STRIPE</p>
                        </div>
                    </div>
                </div>
                <div className='text-end'>
                    <button className='px-7 py-3 bg-white font-semibold cursor-pointer text-black'>PLACE ORDER</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder