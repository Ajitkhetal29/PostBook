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

export { registerUser, loginUser, getUserDetails, getAllUsers };
