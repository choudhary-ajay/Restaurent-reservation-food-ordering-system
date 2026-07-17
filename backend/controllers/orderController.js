import orderModal from "../modals/orderModal.js"
import userModal from "../modals/userModal.js"
import Stripe from "stripe";


const currency='inr'
const deliveryCharge=10

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

const PlaceOrderCod=async(req,res)=>{
    try{
        const {userId,address,items,amount}=req.body


        const orderdata={
            userId,
            items,
            address,
            amount,
            payment:false,
            paymentMethod:"cod",
            date:Date.now()

        }

        const neworder =new orderModal(orderdata)
        await neworder.save()

        await userModal.findByIdAndUpdate(userId,{cartdata:{}})
        res.json({success:true,message:"order placed"})

    }catch(error){
        res.json({success:false,message:error.message})
    }
}


const placeOrderStripe=async (req,res)=>{
     try{
        const {userId,items,address,amount,}=req.body;
        const { origin }=req.headers

        const orderdata={
            userId,
            items,
            address,
            amount,
            payment:false,
            paymentMethod:"stripe",
            date:Date.now(),
        }
        const neworder= new orderModal(orderdata)
        await neworder.save()

        const line_items=items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))

        // line_items.push({
        //     price_data:{
        //         currency:currency,
        //         product_data:{
        //             name:'Delivery Charges'
        //         },
        //         unit_amount:deliveryCharge*100
        //     },
        //     quantity:1

        // })

        const session=await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${neworder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${neworder._id}`,
            line_items,
            mode:'payment',
        })

        res.json({success:true,session_url:session.url})
        
    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})

    }
    
}
const verifypayment=async(req,res)=>{
    try{
        const {userId,success,orderId}=req.body

        if(success){
            await orderModal.findByIdAndUpdate(orderId,{payment:true})
            await userModal.findByIdAndUpdate(userId,{cartdata:{}})
            res.json({success:true})
        }else{
            await orderModal.findByIdAndDelete(orderId)
            res.json({success:false})
        }

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }
}

const getorder=async(req,res)=>{
    try{
        const {userId}=req.body

        const orders=await orderModal.find({userId})
        return res.json({success:true,orders})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }
}

//all order for admin
const allOrders=async (req,res)=>{
    try{
        const orders=await orderModal.find({})
        res.json({success:true,orders})
    }catch(error){
        console.log(error)
    }
    
}

const cancelOrder=async(req,res)=>{
   try{
     const {orderId,itemId}=req.body

    const order=await orderModal.findById(orderId)
    order.items=order.items.filter(item=>item._id!==itemId)
    if(order.items.length===0){
       await orderModal.findByIdAndDelete(orderId)
       return res.json({success:true,message:"Item cancelld"})
       
    }
    await order.save()
    return res.json({success:true,message:"Item cancelld"})
   }catch(error){
    console.log(error.message)
    return res.json({success:false,message:error.message})
   }
}

//status
const updatestatus=async (req,res)=>{

    try{
        const {orderId,status}=req.body

        await orderModal.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"order updated"})
    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})

    }
    
}

export {PlaceOrderCod,getorder,cancelOrder,allOrders,updatestatus,placeOrderStripe,verifypayment}