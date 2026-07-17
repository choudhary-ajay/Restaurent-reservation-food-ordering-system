import express from "express"
import authuser from "../middleware/auth.js"
import { allOrders, cancelOrder, getorder, PlaceOrderCod, placeOrderStripe, updatestatus, verifypayment } from "../controllers/orderController.js"
import adminAuth from "../middleware/adminAuth.js"

const orderRouter=express.Router()

orderRouter.post("/cod",authuser,PlaceOrderCod)
orderRouter.post("/get",authuser,getorder)
orderRouter.post("/cancel",authuser,cancelOrder)
orderRouter.post("/list",adminAuth,allOrders)
orderRouter.post("/status",adminAuth,updatestatus)
orderRouter.post("/stripe",authuser,placeOrderStripe)
orderRouter.post("/verify",authuser,verifypayment)


export default orderRouter
