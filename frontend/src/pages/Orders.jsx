import React, { useContext, useEffect, useState } from 'react'
import { reserveContext } from '../context/reserveContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {
    const { product, backendurl,token } = useContext(reserveContext)
    const [orderdata, setorderdata] = useState([])

    const getorders = async () => {
        try {
            const response = await axios.post(backendurl+"/api/order/get", {}, {headers: {token}})
            if (response.data.success) {
                let allorder = []
                response.data.orders.map((order) => {
                    order.items.map((item) => {
                        item["status"] = order.status
                        item["payment"] = order.payment
                        item["paymentMethod"] = order.paymentMethod
                        item['date'] = order.date
                        item['orderId']=order._id

                        allorder.push(item)
                    })
                })
                setorderdata(allorder)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch data")
        }
    }

    const cancelorder=async(orderId,itemId)=>{
        try{ 
            const response=await axios.post(backendurl+"/api/order/cancel",{orderId,itemId},{headers:{token}})
            if(response.data.success){
                toast.success("Item removed from Orders")
                setorderdata(prev=>prev.filter(item=>(item._id!==itemId || item.orderId!==orderId)))
                //  getorders()
            }
        }catch(error){
            console.log(error.message)
            toast.error("failed to cancel order")
        }
    }

    useEffect(()=>{
        getorders()
    },[token])

    return (
        <>
            <div className='max-w-6xl px-2 m-4 mx-7 lg:mx-auto'>
                <h1 className='text-white sm:text-4xl  text-3xl font-bold mx-auto text-center mb-5'>My Orders</h1>

                {orderdata.length>0 ? orderdata.map((item,index)=>(<div key={index} className='py-4 px-2 border-t flex flex-col md:flex-row gap-5 justify-between items-center border-b border-gray-300'>
                    <div className='flex w-full gap-2'>
                        <img className='w-28 h-28' src={item.image} alt="" />
                        <div>
                            <h2 className='text-orange-600  font-medium text-base sm:text-xl mb-2'>{item.name}</h2>
                            <div className='flex gap-6 mb-1'>
                                <p className='text-white font-bold'>₹{item.price}</p>
                                <p className='text-white'>Quantity : <span className='text-gray-300'>{item.quantity}</span></p>
                            </div>
                            <p className='text-white'>Time : <span className='text-gray-400'>{new Date(item.date).toLocaleTimeString()}</span></p>
                            <p className='text-white'>Payment Method: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                        </div>
                    </div>
                    <div className='flex w-full justify-between'>
                        <p className='text-white flex items-center gap-3'><span className='bg-green-300 w-4 h-4 inline-block rounded-full '></span>{item.status}</p>
                    <button onClick={()=>{cancelorder(item.orderId,item._id)}} className='bg-linear-to-tr w-fit text-white from-orange-700 font-semibold active:bg-orange-500 cursor-pointer  to-amber-400 px-2 sm:px-4 py-1 rounded-lg'>Cancel</button>
                    </div>
                </div>)):(<p className='text-orange-600 font-semibold text-center'>You Don't Have Any Order</p>)}
            </div>
        </>
    )
}

export default Orders