import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser=asyncHandler(async(req,res)=>{
    // res.status(200).json({message:"ok"})

    const {fullName,email,userName,password}=req.body
    console.log("email;:",email)
    // if(fullName===""){
    //     throw new ApiError(400,"full Name is Required")
    // }
    if(
        [fullName,email,userName,password].some((field)=>{
            field?.trim()===""
        })
    ){
        throw new ApiError(400,"All fields are required")
    }
     
    const existedUser=User.findOne({
        $or:[{userName}, {email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or userName already exists")
    }
const avatarLocalPath=req.files?.avatar[0]?.path;
const coverImageLoaclPath= req.files?.coverImage[0]?.path;
    
if(!avatarLocalPath){
    throw new ApiError(400,"Avator file is required")
}

const avatar=await uploadOnCloudinary(avatarLocalPath)
const coverImage=await uploadOnCloudinary(coverImageLoaclPath);

if(!avatar){
        throw new ApiError(400,"Avator file is required")
}

const user= await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:userName.toLowerCase()
})
const createdUser=await user.findById(user._id).select(
    "-password -refreshToken"
)
if(!createdUser){
    throw new ApiError(500,"something went wrong while registering User");
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"User Register Successfully")
)

})

export {registerUser};