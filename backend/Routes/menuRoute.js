import express from "express"
import {addItem,removeItem,listItem,singleItem} from "../controllers/menuController.js"
import upload from "../middleware/multer.js"
import adminAuth from "../middleware/adminAuth.js"

const menuRouter=express.Router()

menuRouter.post("/add",adminAuth ,upload.fields([{name:'image1',maxCount:1}]),addItem)
menuRouter.post("/remove",adminAuth,removeItem)
menuRouter.post("/single",adminAuth,singleItem)
menuRouter.get("/list",listItem)

export default menuRouter