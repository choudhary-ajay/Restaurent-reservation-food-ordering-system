import userModal from "../modals/userModal.js"
import bcrypt from "bcrypt"
import "dotenv/config"
import jwt from "jsonwebtoken"

const createToken=(id)=>{
return jwt.sign({id},process.env.JWT_SECRET)
}

const signup=async(req,res)=>{
    try{
        const data=req.body
        const email=data.email
        const isexist=await userModal.findOne({email})

        if(isexist){
             return res.json({success:false,message:"user already existed"})
        }
        const salt=await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(data.password,salt)

        data.password=hashedpassword

        const newUser=new userModal(data)
        const user= await newUser.save()

        const token=createToken(user._id)
        res.json({success:true,token,message:"Registration succesfull"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const login=async(req,res)=>{
    try{
        const data=req.body
        const email=data.email
        const user=await userModal.findOne({email})
        if(!user){
            return res.json({success:false,message:"User Not found"})
        }
        const ismatch=await bcrypt.compare(data.password,user.password)

        if(ismatch){
            const token=createToken(user._id)
            return res.json({success:true,token})
        }else{
            return res.json({success:false,message:"Invalid credential"})
        }
    }catch(error){

    }

}

const adminlogin=async (req,res)=>{
    try{
        const {email,password}=req.body;

        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"})
        }
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }

}

export {signup,login,adminlogin}