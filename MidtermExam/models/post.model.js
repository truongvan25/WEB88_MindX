import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        require: true
    }},
    {
    timestamps: true
    });
const Post  = mongoose.model("Post", postSchema);
export default Post;
