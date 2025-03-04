import express from "express"

import { getUserDetails, loginUser, registerUser } from "../controllers/userController.js"
import authUser from "../middlewares/userAuth.js"


const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/details",authUser, getUserDetails)

export default userRouter;
