import Post from "../models/post.model.js"
import User from "../models/users.model.js"


// 3. Viết API cho phép người dùng tạo bài post với userId, content là bắt buộc, createdAt và updatedAt mặc định sử dụng thời gian khi tạo.
//API cần trả ra lỗi tương ứng nếu có.
//API: /posts
//Chỉ người dùng đã có thông tin trên hệ thống và đã đăng nhập, mới được phép tạo.
//API đính kèm thêm query apiKey để xác minh người dùng
//Ví dụ:  /posts?apiKey=mern-$507f1f77bcf86cd799439011$-$nguyena@gmail.com$-$9bb4d-3b7d-4ad-9bdd-2d7dcb6d$
	//Nếu không có apiKey, hoặc apiKey không thể xác thực được sẽ không được tạo bài post

const createPost = async (req, res) =>{
 
    try {
        const {content} = req.body;
        if ( !content){
            return res.json({
                message:"Missing Content"
            })
        }
        const apiKey = req.query.apiKey;
        const elements = apiKey.split("-$");
        if (elements.length < 4){
            return res.json({
                message:"apiKey is invalid"
            })
        }
        
        const [mern, userIdapi, email, ] = elements;
        
        if (mern !== "mern"){
            res.json({
                
                message: `"apiKey format wrong"`
            })
        }
        const existUser = await User.findOne({_id: userIdapi, email})
        if (!existUser){
            res.json({
                message: "UserId or Email invalid. You're not allowed to post/ Login firs please"
            })
        }
        const newPost = await Post.create({
            userId: existUser._id,
            content
        })
        res.status(200).json({
            message: "Created new post successfully",
            newPost
        })


    }catch (error){
        res.json({
            error: error.message
        })
    }
}

//4. Viết API cho phép người dùng cập nhật bài post với id của bài post được truyền trên params. Cần sử dụng apiKey để xác thực thông tin giống yêu cầu 3.
// API cần trả ra lỗi tương ứng nếu có.
// API: /posts/:id
// Ví dụ: /posts/507f1f77bcf86cd799439011?apiKey=abcd…
// Không thể cập nhật bài post khi không tồn tại bài post, apiKey không xác thực được

const updatePost = async (req, res) =>{
 
    try {
        const {postId} = req.params;
        const existedPost = await Post.findOne({_id: postId});
        if (!existedPost){
            return res.status(400).json({
                message: "This post hasnt existed, please create a new one"
            })
        }
        const {content} = req.body;
        if ( !content){
            return res.json({
                message:"Missing update Content"
            })
        }
        const apiKey = req.query.apiKey;
        const elements = apiKey.split("-$");
        if (elements.length < 4){
            return res.json({
                message:"apiKey is invalid"
            })
        }
      
        const [mern, userIdapi, email, tailor] = elements;
        
        if (mern !== "mern"){
            return res.json({
                
                message: `"apiKey format wrong"`
            })
        }
        const existUser = await User.findOne({_id: userIdapi, email})
        if (!existUser){
            return res.json({
                
                message: "UserId or Email invalid. You're not allowed to update/ Login to get ApiKey"
            })
        }
        existedPost.content = content;
        const newPost = await existedPost.save()
        res.status(200).json({
            message: "Updated post successfully",
            newPost
        })


    }catch (error){
        res.json({
            error: error.message
        })
    }
}
const PostController = {
    createPost,
    updatePost
};
export default PostController;