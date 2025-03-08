import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  try {
    const { name, email, gender, password, DOB, age, Maritial_Status } =
      req.body;
    const exists = await userModel.findOne({ email });

    if (exists) {
      console.log("User already exists");
      return res.json({ success: false, message: "User already exists" });
    }

    if (age < 16) {
      console.log("user must 16 yrs old");

      return res.json({ success: false, message: "user must 16 yrs old" });
    }

    if (password.length < 4) {
      console.log("password must have atleast 4 characters");

      return res.json({
        success: false,
        message: "password must have atleast 4 characters",
      });
    }

    if (!validator.isEmail(email)) {
      console.log("password must have atleast 4 characters");

      return res.json({ success: false, message: "email is not valid" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      password: hashedPassword,
      email,
      gender,
      age,
      DOB,
      Maritial_Status,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      res.json({ success: false, message: "No user found" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      res.json({ success: false, message: "Invalid Password" });
    }

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.body;
    const userInfo = await userModel.findById({ _id: userId });
    if (!userInfo) {
      res.json({ success: false, message: "No User Found" });
    } else {
      res.json({ success: true, userInfo });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find({});

    res.json({ success: true, allUsers });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const sendFriendrequest = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const { userId } = req.body;

    const sender = await userModel.findById(userId);
    const receiver = await userModel.findById(receiverId);

    if (!receiver) {
      return res.json({ success: false, message: "reciver not found" });
    }

    receiver.friendRequests.push(userId);
    await receiver.save();

    res.json({ success: true, message: "Friend Request sent " });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const { userId } = req.body;
    const { senderId } = req.params;

    const user = await userModel.findById(userId);
    const sender = await userModel.findById(senderId);

    if (!user.friendRequests.includes(senderId)) {
      return res.json({
        success: false,
        message: "No friend request found.",
      });
    }

    user.friendRequests = user.friendRequests.filter(
      (id) => id.toString() !== senderId
    );
    user.friends.push(senderId);
    await user.save();

    sender.friends.push(userId);
    await sender.save();
    res.json({ success: true, message: "Request Accepted" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getAllfriendRequests = async (req, res) => {
  const { userId } = req.body;

  const user = await userModel
    .findById(userId)
    .populate("friendRequests", "name");

  if (!user) {
    return res.json({ success: true, message: "user not found" });
  }
  const friendRequests = user.friendRequests;

  res.json({ success: true, friendRequests });
};

const getAllfriends = async (req, res) => {
  const { userId } = req.body;

  const user = await userModel
    .findById(userId)
    .populate("friendRequests", "name");

  if (!user) {
    return res.json({ success: true, message: "user not found" });
  }
  res.json({ success: true, friends: user.friends });
};

const removeFriendRequest = async (req, res) => {
  try {
    const { userId } = req.body;
    const { requestId } = req.params;

    console.log("removeFriendRequest called");

    const user = await userModel.findById(userId);

    if (!user.friendRequests.includes(requestId)) {
      return res.json({
        success: false,
        message: "No friend request found.",
      });
    }

    user.friendRequests = user.friendRequests.filter(
      (id) => id.toString() !== requestId
    );
    await user.save();
    res.json({ success: true, message: "Request removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removefreind = async (req, res) => {
  try {
    const { friendId } = req.params;
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    const friend = await userModel.findById(friendId);

    if (!user) {
      return res.json({
        success: false,
        message: "No user found.",
      });
    }
    if (!friend) {
      return res.json({
        success: false,
        message: "No friend found.",
      });
    }
    if (!user.friends.includes(friendId)) {
      return res.json({
        success: false,
        message: "you both were not frined.",
      });
    }
    if (!friend.friends.includes(userId)) {
      return res.json({
        success: false,
        message: "you both were not frined.",
      });
    }

    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    friend.friends = user.friends.filter((id) => id.toString() !== userId);

    await user.save();
    await friend.save();

    res.json({ success: true, message: "friend Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getUserDetails,
  getAllUsers,
  acceptFriendRequest,
  sendFriendrequest,
  getAllfriendRequests,
  getAllfriends,
  removeFriendRequest,
  removefreind,
};
