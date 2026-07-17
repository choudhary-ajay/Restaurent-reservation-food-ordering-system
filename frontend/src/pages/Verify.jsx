import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { reserveContext } from '../context/reserveContext'

const Verify = () => {
    const {token,backendurl,navigate,setcartItems}=useContext(reserveContext)
    const [searchparams,setsearchparams]=useSearchParams()

    const success=searchparams.get("success")
    const orderId=searchparams.get("orderId")

    const verifypayment=async ()=>{
        try{
            if(!token){
                return null
            }
            const resonse= await axios.post(backendurl+"/api/order/verify",{success,orderId},{headers:{token}})

            if(resonse){
                setcartItems({})
                navigate("/orders")
            }else{
                navigate("/cart")
            }

        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        verifypayment()
    },[token])
  return (
    <div>verify</div>
  )
}

export default Verify