import { addPost, getAllPost, likePost } from "../controllers/postController.js";

import express from 'express'
import upload from "../middlewares/multer.js";
import authUser from "../middlewares/userAuth.js";

const postRouter = express.Router();

postRouter.post('/add', upload.single("image"), addPost)
postRouter.post('/allPosts', getAllPost)
postRouter.post('/like/:postId',authUser, likePost )


export default postRouter