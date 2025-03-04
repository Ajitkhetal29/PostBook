import { v2 as cloudinary } from "cloudinary";
import postModel from "../models/postModel.js";

const addPost = async (req, res) => {
  try {
    const { userId, description } = req.body;

    const image = req.files.image && req.files.image;

    let imgUrl = null;

    let result = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });

    imgUrl = result.secure_url;

    const newPost = {
      userId,
      description,
      image: imgUrl,
    };

    const post = new postModel(newPost);
    await post.save();
    res.json({ success: true, message: "Post Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {addPost}
