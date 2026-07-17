import express from "express"
import authuser from "../middleware/auth.js"
import adminAuth from "../middleware/adminAuth.js"
import { cancelreservation, getAllReservation, getreservation, reserve } from "../controllers/reservationController.js"

const reservationRouter=express.Router()

reservationRouter.post("/reserve",authuser,reserve)
reservationRouter.post("/get",authuser,getreservation)
reservationRouter.post("/cancel",authuser,cancelreservation)
reservationRouter.post("/allreservations",adminAuth,getAllReservation)
reservationRouter.post("/remove",adminAuth,cancelreservation)

export default reservationRouter