import userModal from "../modals/userModal.js"


export const addToCart=async(req,res)=>{
    try{
        const {userId,id}=req.body
        const userdata=await userModal.findById(userId)
        const cartdata=userdata.cartdata

        if(cartdata[id]){
            cartdata[id]=cartdata[id]+1
        }else{
            cartdata[id]=1
        }
        await userModal.findByIdAndUpdate(userId,{cartdata})
        return res.json({success:true,message:"Added to cart"})
    }catch(error){
        console.log(error)
       return res.json({success:false,message:error.message})
    }
}
export const updateCart=async(req,res)=>{
    try{
        const {userId,id,quantity}=req.body
        const userdata=await userModal.findById(userId)
        const cartdata = userdata.cartdata
        cartdata[id]=quantity
        await userModal.findByIdAndUpdate(userId,{cartdata})
        res.json({success:true,message:"Cart updated"})
    }catch(error){
        console.log(error.message)
    }
}

export const getCartData=async(req,res)=>{
    try{
        const {userId}=req.body
    const userdata=await userModal.findById(userId)
    const cartItems=userdata.cartdata
    res.json({success:true,cartItems})
    }catch(error){

    }
}