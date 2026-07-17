import express from "express"
import authuser from "../middleware/auth.js"
import { addToCart, getCartData, updateCart } from "../controllers/cartController.js"

const CartRouter=express.Router()

CartRouter.post("/add",authuser,addToCart)
CartRouter.post("/get",authuser,getCartData)
CartRouter.post("/update",authuser,updateCart)
export default  CartRouter