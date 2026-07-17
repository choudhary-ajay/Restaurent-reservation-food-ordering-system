import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import menuModal from "../modals/menuModal.js";
import { json } from "express";

// add Item
const addItem=async (req,res)=>{
    try{

        const {name,description,category,price}=req.body;
        const image1 = req.files.image1 && req.files.image1[0]
      

    const images=[image1].filter((item)=>item!==undefined);
    let imagesurl=await Promise.all(    
   images.map(async (item)=>{
        let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
        return result.secure_url
    })
    )

    const newItem=new menuModal({
        name,description,category,price,
        price:Number(price),
        image:imagesurl,
        date:Date.now()
    })
    const Item=await newItem.save()

    res.json({success:true,message:"Item added"})

    } catch(error){
        console.log(error)
        return res.json({success:false,message:error.message})
    }

}

//listItem
const listItem=async (req,res)=>{
    try{
        const items=await menuModal.find({})
        
        res.json({success:true,items})
    } catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }
}

// remove Item
const removeItem=async (req,res)=>{
    try{
        await menuModal.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Item Removed"})

    } catch(error){
         console.log(error)
        res.json({success:false,message:error.message})
    }

}

const singleItem= async (req,res)=>{
    try{
    const {Productid}=req.body;
    const Item = await menuModal.findById(Productid)
    console.log(Item)
    res.json({success:true,Item})
    } catch(error){
         console.log(error)
        res.json({success:false,message:error.message})
    }

}

export {addItem,removeItem,singleItem,listItem}