import express from "express"
import { adminlogin, login, signup } from "../controllers/userController.js"

const userRouter=express.Router()

userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.post("/admin",adminlogin)

export default userRouter

