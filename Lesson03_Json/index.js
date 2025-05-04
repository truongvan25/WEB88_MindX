import  express from "express";
const app = express();
app.use(express.json());
const PORT = 8080;
app.get('/health-check', (req, res)=>{
    res.json({
        status: 1,
        message: "Server is running successfully"
    });
})

// app.get('/users', (req, res)=>{
//     const endpoint = "http://localhost:3000/users";
//     fetch(endpoint)
//         .then( (jsonObject) =>{
//         return jsonObject.json();
//     }).then((data)=>{
//         res.json(data);
//     }).catch((error)=>
//     console.log(error))
// });


// MẪU CỦA MENTOR
// app.get('/users', async (req, res)=>{
//     const endpoint = 'http://localhost:3000/users';
//     const resApi = await fetch(endpoint);;
//     const data = await resApi.json();
//     res.json(data)
// })

// app.post('/users', async(req, res)=>{
//     const {userName} = req.body;
//     try {
//         if (!userName){
//             throw new Error("Missing userName")
//         }
//         const endpoint = 'http://localhost:3000/users';
//         const resApi = await fetch(endpoint);
//         const data = await resApi.json();
//         const nextUser = data?.length+1;
//         const newUser = {
//             userName,
//             id: `US00${nextUser}`
//         }
//         const newUserJson = await fetch(endpoint, {
//             method:'POST',
//             body:JSON.stringify(newUser),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         const newUserData = await newUserJson.json();
//         res.json({
//             message: "User created successfully",
//             data: newUserData
//         })
//     }catch (error) {
//         console.log(error);
//         res.status(400).json({
//             data:null,
//             success:false,
//             error:error?.message        })
//     }
// })

// BÀI TẬP
// 1. Viết API việc đăng ký user với userName, 
// id sẽ được là một string ngẫu nhiên, không được phép trùng, bắt đầu từ ký tự US (ví dụ: US8823).
app.post('/users', async(req, res)=>{
    const {userName} = req.body;
    try {
        if (!userName){
            throw new Error("Missing userName")
        }
        const endpoint = 'http://localhost:3000/users';
        let nextUser = `US${Math.floor(Math.random() * (1000 - 100 + 1)) + 100}`;
        
        const newUser = {
            userName,
            id: nextUser
        }
        const newUserJson = await fetch(endpoint, {
            method:'POST',
            body:JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const newUserData = await newUserJson.json();
        res.json({
            message: "User created successfully",
            data: newUserData
        })
    }catch (error) {
        console.log(error);
        res.status(400).json({
            data:null,
            success:false,
            error:error?.message        })
    }
})

// 2.Viết API cho phép user tạo bài post (thêm bài post, xử lý id tương tự user).
app.post('/posts', async(req, res)=>{
    const { content, userId, views} = req.body;
    try {
        if ( !content || !userId || !views){
            throw new Error("Missing  content, userId, views")
        }
        const endpoint = 'http://localhost:3000/posts';
        let nextPost = `PS${Math.floor(Math.random() * (1000 - 100 + 1)) + 100}`;   
        const newPost = {
            id: nextPost,
            content, 
            userId,
            views
        }
        const newPostJson = await fetch(endpoint, {
            method:'POST',
            body:JSON.stringify(newPost),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const newPostData = await newPostJson.json();
        res.json({
            message: "Post created successfully",
            data: newPostData
        })
    }catch (error) {
        console.log(error);
        res.status(400).json({
            data:null,
            success:false,
            error:error?.message        })
    }
})

// 3. Viết API cho phép user chỉnh sửa lại bài post 
// (chỉ user tạo bài viết mới được phép chỉnh sửa)
app.put('/posts/:id', async (req, res)=>{
    const {id} = req.params;
    const endpoint1 = 'http://localhost:3000/posts';
    const resApi = await fetch(endpoint1);
    const data = await resApi.json();
    const checkExists = data.findIndex(post => post.id === id);
    if (checkExists === -1){
        res.json({
            message: "The id post doesn't exist in this data",
        })
    }
    else {
        const {content, userId, views} = req.body;
        
        if ( !content || !userId || !views){
            res.json({
                message: "Missing  content, userId, views"})
        }
        else {
            if (userId !== data[checkExists].userId){
                res.json({
                    message: "You are not authorized to this post",
                })
            }
            else {
                const endpoint = `http://localhost:3000/posts/${id}`;
                const newPost = {
                    id,
                    content, 
                    userId,
                    views
                }
                const newPostJson = await fetch(endpoint, {
                    method:'PATCH',
                    body:JSON.stringify(newPost),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const newPostData = await newPostJson.json();
                res.json({
                    message: "Post created successfully",
                    data: newPostData
                })
            }
        }
    }
})

// 4. Viết API cho phép user được comment vào bài post
app.post('/posts/:id/comments', async (req, res)=>{
    const { id } = req.params; // id của bài post
    const { userId, content } = req.body;

    try {
        if (!userId || !content) {
            throw new Error("Missing userId or content for comment");
        }

        // Kiểm tra bài post có tồn tại không
        const postsEndpoint = 'http://localhost:3000/posts';
        const resPosts = await fetch(postsEndpoint);
        const posts = await resPosts.json();

        const postExists = posts.find(post => post.id === id);
        if (!postExists) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // Gửi comment mới vào database
        const commentsEndpoint = 'http://localhost:3000/comments';
        const newCommentId = `CMT${Math.floor(Math.random() * (10000 - 1000) + 1000)}`; // random id cho comment
        const newComment = {
            id: newCommentId,
            postId: id,
            userId,
            content
        };

        const commentResponse = await fetch(commentsEndpoint, {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const commentData = await commentResponse.json();

        res.status(201).json({
            message: "Comment added successfully",
            data: commentData
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            data: null,
            success: false,
            error: error?.message
        });
    }
})

// 5. Viết API cho phép user chỉnh sửa comment (chỉ user tạo comment mới được sửa)
app.put('/comments/:id', async (req, res)=>{
    const {id} = req.params;
    const endpoint1 = 'http://localhost:3000/comments';
    const resApi = await fetch(endpoint1);
    const data = await resApi.json();
    const checkExists = data.findIndex(cmt => cmt.id === id);
    if (checkExists === -1){
        res.json({
            message: "The id comment doesn't exist in this data",
        })
    }
    else {
        const {postId, content, userId} = req.body;
        
        if (!postId ||  !content || !userId ){
            res.json({
                message: "Missing postId, content, userId"})
        }
        else {
            if (userId !== data[checkExists].userId){
                res.json({
                    message: "You are not authorized to this post",
                })
            }
            else {
                const endpoint = `http://localhost:3000/comments/${id}`;
                const newPost = {
                    id,
                    postId,
                    content, 
                    userId,
                    
                }
                const newPostJson = await fetch(endpoint, {
                    method:'PATCH',
                    body:JSON.stringify(newPost),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const newPostData = await newPostJson.json();
                res.json({
                    message: "Post created successfully",
                    data: newPostData
                })
            }
        }
    }
})

// 6. Viết API lấy tất cả comment của một bài post.
app.get('/posts/:id/comments', async (req, res) => {
    const { id } = req.params; // lấy id post từ URL

    try {
        // lấy tất cả comment có postId = id
        const commentsEndpoint = `http://localhost:3000/comments?postId=${id}`;
        const resComments = await fetch(commentsEndpoint);
        const comments = await resComments.json();

        res.json({
            message: "Comments fetched successfully",
            data: comments
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            data: null,
            success: false,
            error: error?.message
        });
    }
});

// 7. Viết API lấy tất cả các bài post
//  3 comment đầu (dựa theo index) của tất cả user 
app.get('/posts', async (req, res) => {
    
    try {
        const postEndpoint = `http://localhost:3000/posts`;
        const resPosts = await fetch(postEndpoint);
        const posts = await resPosts.json();
        const result = await Promise.all(  posts.map(async (post)=>{
            const commentsEndpoint = `http://localhost:3000/comments?postId=${post.id}`;
            const resComments = await fetch(commentsEndpoint);
            const comments = await resComments.json();   
            return {
                ...post,
                comments: comments.slice(0, 3)
            }
        }))
        res.json({
            message: "Comments fetched successfully",
            data: result
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            data: null,
            success: false,
            error: error?.message
        });
    }
});

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
});