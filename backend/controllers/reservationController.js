import reservationModal from "../modals/reservationModal.js"

const reserve=async(req,res)=>{
const formdata=req.body
console.log(formdata)
try{
    const newreservation =new reservationModal(formdata)
    const reservation=await newreservation.save()

    return res.json({success:true,message:"Reservation successfull"})
}catch(error){
    console.log(error)
    return res.json({success:false,message:error.message})
}
}

//for user
const getreservation=async(req,res)=>{
    try{
        const {userId}=req.body
        const reservation=await reservationModal.find({userId})
        return res.json({success:true,reservation})
    }catch(error){
        return res.json({success:false,message:error.message})
    }
}

//for admin
const getAllReservation=async(req,res)=>{
    try{
        const reservations=await reservationModal.find({})
        console.log(reservations)
        return res.json({success:true,reservations})
    }catch(error){
        return res.json({success:false,message:error.message})
    }
}

const cancelreservation=async(req,res)=>{
    try{
        const {id}=req.body
        console.log(id)
        await reservationModal.findByIdAndDelete(id)
        return res.json({success:true,message:"Reservation cancelled"})
    }catch(error){
        console.log(error)
        return res.json({super:false,message:error.message})
    }
}

export {reserve,cancelreservation,getreservation,getAllReservation}