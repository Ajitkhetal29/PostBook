import mongoose from "mongoose"

const postSchema = new mongoose.Schema(
    {
        userId : {type : mongoose.Schema.Types.ObjectId, ref : "user",  required: true},
        image : {type : String},
        description : {type: String , required:true}
    }
)

const postModel = mongoose.models.post || mongoose.model('post',postSchema)

export default postModel;