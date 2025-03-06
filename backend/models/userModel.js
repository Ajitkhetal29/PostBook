import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    DOB: { type: Date, required: true },
    age: { type: Number, required: true },
    Maritial_Status: { type: String },
    gender: { type: String },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], 
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
