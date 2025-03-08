import express from "express"

import { acceptFriendRequest, getAllfriendRequests, getAllfriends, getAllUsers, getUserDetails, loginUser, registerUser, removefreind, removeFriendRequest, sendFriendrequest } from "../controllers/userController.js"
import authUser from "../middlewares/userAuth.js"


const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/details",authUser, getUserDetails)
userRouter.post("/allUsers", getAllUsers)
userRouter.post("/sendFriendRequest/:receiverId", authUser,sendFriendrequest )
userRouter.post("/acceptFriendRequest/:senderId", authUser,acceptFriendRequest )
userRouter.post("/removeFriendRequest/:requestId", authUser,removeFriendRequest)
userRouter.post("/getAllfriendRequests",authUser,getAllfriendRequests )
userRouter.post("/getAllfriends",authUser,getAllfriends )
userRouter.post("/removefreind/:friendId",authUser,removefreind )

export default userRouter;
