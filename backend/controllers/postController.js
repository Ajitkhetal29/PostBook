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
    const Posts = await postModel
      .find({})
      .populate("userId", "name")
      .populate({ path: "comments.userId", select: "name" });
    res.json({ success: true, Posts });
  } catch (error) {
    console.log(error);
    console.log({ success: false, message: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;


    const post = await postModel.findById(postId);

    if (!post) {
      return res.json({ success: false, message: "Post not Found" });
    }

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      await post.save();
      return res.json({ success: true, message: "post Unliked" });
    } else {
      post.likes.push(userId);
      await post.save();
      return res.json({ success: true, message: "post Liked" });
    }
  } catch (error) {
    console.log(error);
    console.log({ success: false, message: error.message });
  }
};

const postComment = async (req, res) => {
  const { postId } = req.params;
  const { commentText, userId } = req.body;

  const post = await postModel.findById({ _id: postId });

  if (!post) {
    return res.json({ success: false, message: "No Post Found" });
  }

  if (!commentText) {
    return res.json({ success: false, message: "Comment cannot be empty" });
  }

  const comment = {
    userId,
    text: commentText,
  };

  post.comments.push(comment);
  await post.save();

  res.json({ success: true, message: "comment posted" });
};

const fetchAllComment = async (req, res) => {
  try {
    const { postId } = req.params;

    const Post = await postModel.find({ _id: postId });

    res.json({ success: true, comments: Post.comments });
  } catch (error) {
    console.log(error);
    console.log({ success: false, message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    if (!post.comments || post.comments.length === 0) {
      return res.status(404).json({ success: false, message: "No comments found" });
    }

    post.comments = post.comments.filter(comment => comment._id.toString() !== commentId);

    // Save the updated post document
    await post.save();

    res.json({ success: true, message: "Comment deleted", comments: post.comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addPost, getAllPost, likePost, postComment, fetchAllComment, deleteComment };
