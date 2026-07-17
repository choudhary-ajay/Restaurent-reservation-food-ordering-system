import React, { useState } from 'react'
import { backendurl } from '../App'
import axios from "axios"
import { toast } from 'react-toastify'

const Login = ({setToken}) => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const onsubmithandler=async(e)=>{
        try{
        e.preventDefault();
        const response= await axios.post(backendurl+'/api/user/admin',{email,password})
        console.log(response)
        if(response.data.success){
            setToken(response.data.token)
            toast.success("Login succesfull")
        }
        else{
            toast.error(response.data.message)
        }
        }catch(error){
            console.log(error)
        }

    }
  return (
    <div className='flex w-full min-h-screen justify-center items-center'>
        <div className='bg-white shadow-md max-w-md px-8 py-6 rounded-lg'>
            <h1 className='text-2xl mb-4 font-bold'>Admin Login</h1>
            <form onSubmit={onsubmithandler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='Enter Email' required />
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter Password' required />
                </div>
                <button className='w-full mt-2 rounded-md bg-black text-white px-4 py-2 cursor-pointer'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login