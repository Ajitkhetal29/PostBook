import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        image: { type: String },
        description: { type: String, required: true },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
        comments: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
                text: { type: String, required: true },
                date: { type: Date, default: Date.now },
            },
        ],
    },
    { minimize: false }
);

const postModel = mongoose.models.post || mongoose.model("post", postSchema);

export default postModel;
