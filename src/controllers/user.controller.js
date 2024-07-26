import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloundinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/apiResponse.js";


const registerUser = asyncHandler( async(req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const {fullName, email, username, password} = req.body
    console.log("email: ", email);

    if(
        [fullName, email, username, password].some( (field) => 
        field.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser) {
        throw new ApiError(409, "User with email username already exists")
    }

    // multer giving excess to files
    // local path => file is in server it havent gone to cloudinary
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = await uploadOnCloundinary(avatarLocalPath)
    const coverImage = await uploadOnCloundinary(coverImageLocalPath)

    if(!avatar) {
        throw new ApiError(400, "Avatar is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // removing password and refresh token
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while regristering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

export { registerUser }; 