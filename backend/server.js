import express from "express"
import cors from "cors"
import 'dotenv/config'
import multer from "multer"
import userRouter from "./Routes/userRoute.js"
import connectdb from "./config/mongodb.js"
import reservationRouter from "./Routes/reservationRoute.js"
import CartRouter from "./Routes/cartRoute.js"
import orderRouter from "./Routes/orderRoute.js"
import menuRouter from "./Routes/menuRoute.js"
import connectCloudinary from "./config/cloudinary.js"


const port=4000
const app=express()

app.use(cors())
app.use(express.json())

//multer trying

connectdb()
connectCloudinary()

app.use("/api/user",userRouter)
app.use("/api/reservation",reservationRouter)
app.use("/api/cart",CartRouter)
app.use("/api/order",orderRouter)
app.use("/api/menu",menuRouter)

app.get("/",(req,res)=>{
    res.send("api working")
})
app.listen(port,()=>{
    console.log("app is running on port 4000")
})