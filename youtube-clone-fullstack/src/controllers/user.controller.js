import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiErrors.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res, next) => {
    //get user details from frontend
    //validation - not empty
    //check if user already exists :check by username and email
    //check for images,check for avatar
    //  upload them to cloudinary , avatar
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    // return response

    const { username, fullName, email, password } = req.body;
    console.log("email", email);

    if (
        //checking all the fields are filled or not using some method
        [username, fullName, email, password].some(
            (field) => field?.trim() === "",
        )
    ) {
        throw new ApiError(400, "Please fill all the fields");
    }

    //normal method to check all the fields are filled or not
    //   if(!username || !fullName || !email || !password){
    //     res.status(400);
    //     throw new Error("Please fill all the fields");
    //   }

    //check if user already exists
    const existedUser = await User.findOne({
        //or operator
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    //check for images
    //check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    //only for testing purpose
    // console.log("this is localpath",avatarLocalPath);
    // console.log("req.files", req.files)

    if (!avatarLocalPath) {
        throw new ApiError(400, "Please upload avatar");
    }

    //upload them to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    //checking for avatar
    if (!avatar) {
        throw new ApiError(400, "avatar file is required");
    }

    //create user object - create entry in db
    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    });

    //remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken",
    );

    //check for user creation
    if (!createdUser) {
        throw new ApiError(500, "User creation failed");
    }

    //return response
    return res
        .status(201)
        .json(new ApiResponse(201, "User created", createdUser));
});

export { registerUser };
