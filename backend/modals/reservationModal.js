import mongoose from "mongoose";

const reservationSchema= new mongoose.Schema({
    userId:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    date:{type:String,required:true},
    time:{type:String,required:true},
    guests:{type:Number,required:true}
})

const reservationModal=mongoose.models.reservation || mongoose.model("reservation",reservationSchema)
export default reservationModal