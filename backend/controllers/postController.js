import { v2 as cloudinary } from "cloudinary";
import postModel from "../models/postModel.js";

const addPost = async (req, res) => {
  try {
    const { userId, description } = req.body;

    if (!req.file) {
      const newPost = new postModel({
        userId,
        description,
      });
      await newPost.save();
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });

      const newPost = new postModel({
        userId,
        description,
        image: result.secure_url,
      });
      await newPost.save();
    }

    res.json({ success: true, message: "Post Added" });
  } catch (error) {
    console.error("Error in addPost:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllPost = async (req, res) => {
  try {
    const Posts = await postModel.find({}).populate("userId","name",);
    res.json({ success: true, Posts });
  } catch (error) {
    console.log(error);
    console.log({ success: false, message: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const {postId} = req.params;
    const {userId} = req.body;

    console.log(userId);
    

    const post = await postModel.findById(postId);

    if(!post){
      return res.json({success : false , message :"Post not Found"});
    }

    if(post.likes.includes(userId)){

      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
      await post.save();
      return res.json({success : true , message :"post Unliked"})

    } else{
      post.likes.push(userId);
      await post.save();
      return res.json({success : true , message :"post Liked"})    }

  } catch (error) {
    console.log(error);
    console.log({ success: false, message: error.message });
  }
}

export { addPost,getAllPost , likePost};
