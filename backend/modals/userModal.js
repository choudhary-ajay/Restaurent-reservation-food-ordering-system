import mongoose, { Schema } from "mongoose";

const userSchema=new mongoose.Schema({
name:{type:String,required:true},
email:{type:String,required:true,unique:true},
password:{type:String,required:true},
cartdata:{type:Object,default:{}},
reservations:{type:Object,default:{}}
})

const userModal=mongoose.models.user || mongoose.model("user",userSchema)

export default userModal