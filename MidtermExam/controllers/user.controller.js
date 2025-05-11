import User from "../models/users.model.js";
import bcrypt from "bcrypt"
import { v4 as uuid } from 'uuid';

// 1. Viết API cho phép người dùng đăng ký thông tin,
//  với userName, email, password là bắt buộc, 
// email là duy nhất. 
// API cần trả ra lỗi tương ứng nếu có.
const createUser = async (req, res) => {
    
    try {
        const {userName, email, password}  = req.body;
        if (!userName || !email || !password){
            return res.status(400).json({
                message: "Missing required information: userName, email, password"
            })
        }
        const existUser = await User.findOne({email});
        if (existUser){
            return res.status(400).json ({
                message: "Email already exists, try with another"
            })
        }
        const newUser =  await User.create({
            userName,
            email,
            password
        })
        res.json({
            message :"Create new user successfully",
            newUser
        })
        
    }catch (error){
        res.status(500).json({
            message:"Server error",
            error: error.message
        })
    }
}

// 2. Viết API cho phép người dùng đăng nhập với: email, password
// API cần trả ra lỗi tương ứng nếu có.
// API: /users/login
// Sau khi đăng nhập thành công, API sẽ trả về một apiKey (apiKey này có tác dụng kiểm tra authentication và authorization cho các yêu cầu phía dưới)
// apiKey có dạng:  mern-$userId$-$email$-$randomstring$
// Ví dụ: mern-$507f1f77bcf86cd799439011$-$nguyena@gmail.com$-$9bb4d-3b7d-4ad-9bdd-2d7dcb6d$
// Lưu ý: randomstring sẽ là trường định nghĩa tính hợp lệ của apiKey và mỗi người khi đăng nhập sẽ CHỈ có một apiKey riêng biệt. Mỗi lần đăng nhập, apiKey cần được thay đổi.

const loginUser = async (req, res) =>{
    try {
        const {email, password} = req.body;
        if (!email || !password){
            return res.status(400).json({
                message: "Missing required fields to login: email, password"
            })
        }
        const existUser = await User.findOne({email})
        if (!existUser){
            return res.status(400).json({
                message: "Email not exist"
            })
        }
        const samePassword = bcrypt.compare(password, existUser.password);
        if (!samePassword){
            return res.status(400).json({
                message: "Incorrect pasword"
            })
        }
        const randomTail = uuid();
        const apiKey = `mern-$${existUser._id}-$${existUser.email}-$${randomTail}`
        res.status(200).json({
            message: "Login successfully",
            apiKey: apiKey
        })


    }catch (error){
        res.status(500).json({
            error: error.message
        })
    }
}
const UserController = {
    createUser,
    loginUser
};
export default UserController;