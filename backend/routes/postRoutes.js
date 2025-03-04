import { addPost } from "../controllers/postController.js";

import express from 'express'
import upload from "../middlewares/multer.js";
import authUser from "../middlewares/userAuth.js";

const postRouter = express.Router();

postRouter.post('/add',authUser, upload.single("image"),addPost)

export default postRouter