import { useContext } from 'react'
import  {react, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { reserveContext } from '../context/reserveContext'
import axios from "axios"
import {toast} from "react-toastify"

const Login = () => {
  const {backendurl,token,setToken,navigate}=useContext(reserveContext)
   const [currentState,setcurrentstate]=useState("Log In")

   const [formdata,setformdata]=useState({})
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit=async (data) => {

  
    if(currentState=="Sign Up"){
      try{
      const response =await axios.post(backendurl+"/api/user/signup",data)
      if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      toast.success(response.data.message)
      navigate("/")
      }else{
        toast.error(response.data.message)
      }

      }catch(error){
        console.log(error)
        toast.error(error.message)
      }
    }else{
      try{
        console.log("form submited",currentState)
        const response=await axios.post(backendurl+"/api/user/login",data)
        console.log(response)
        if(response.data.success){
        setToken(response.data.token)
        console.log(token)
        localStorage.setItem("token",response.data.token)
        navigate('/')
        }else{
          toast.error(response.data.message)
        }

      }catch(error){
        console.log(error)
        toast.error(error.message)
      }
    }
  }
  useEffect(()=>{
   
  },[onSubmit])


  return (

       
        
        <form onSubmit={handleSubmit(onSubmit)} className='flex mt-10 text-white max-w-96 mx-auto justify-center items-center gap-4 flex-col' >
            <h1 className='text-3xl font-bold'>{currentState}</h1>
            {currentState=="Log In"?"":(<input {...register("name",{required:{value:true,message:"this feild is required"},minLength:{value:3,message:"minimum 3 characters required"}})} className='border w-full border-white px-2 py-3' type='text' placeholder='Name'/>)}
            {errors.name && <span className='text-red-600 text-sm'>{errors.name.message}</span>}
           <input {...register("email",{required:{value:true,message:"this feild is required"},minLength:{value:3}})} className='border w-full border-white px-2 py-3' type="email" placeholder='Email' />
           {errors.email && <span className='text-red-600 text-sm' >{errors.email.message}</span>}
           <input {...register("password",{required:{value:true,message:"this feild is required"},minLength:{value:5,message:"Password should contain minimum 5 characters"}})} className='border w-full border-white px-2 py-3' type="password" placeholder='Password' />
           {errors.password && <span className='text-red-600 text-sm'>{errors.password.message}</span>}
           <div className='flex justify-between w-full'>
            <p>Forgot Your Password?</p>
            {currentState=="Sign Up"?(<p onClick={()=>{setcurrentstate("Log In")}}>Login</p>):(<p onClick={()=>{setcurrentstate("Sign Up")}}>Sign Up</p>)}
           </div>
           <button type='submit' className='bg-white text-black px-6 font-bold cursor-pointer mt-4 py-2'>{currentState}</button>
        </form>
  )
}

export default Login