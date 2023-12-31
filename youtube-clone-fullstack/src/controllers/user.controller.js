import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiErrors.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//generating access token and refresh token
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        //generate a token
        const accessToken = user.generateTokens();
        const refreshToken = user.generateRefreshToken();

        //save refresh token in db
        user.refreshToken = refreshToken;

        //validateBeforeSave - false
        //because we don't have password field in user model
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Token generation failed");
    }
};

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

const loginUser = asyncHandler(async (req, res, next) => {
    //req.body - data
    //username or email
    //find the user
    //password check
    //generate access token and refresh token
    //send cookie

    const { username, email, password } = req.body;

    console.log(email);

    if (!(email || username)) {
        throw new ApiError(400, "Please provide email");
    }

    //find the user
    const user = await User.findOne({ $or: [{ username }, { email }] });

    //check if user exists
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    //password check
    const isPasswordMatch = await user.isPasswordMatch(password);

    if (!isPasswordMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    //generate access token and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id,
    );

    //don't send password and refresh token in response
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken",
    );

    const options = {
        httpOnly: true,
        path: "/",
    };

    //send cookie
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    message: "Logged in successfully",
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "Logged in successfully",
            ),
        );
});

//logout user
const logoutUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: undefined },
        },
        { new: true },
    );

    const options = {
        httpOnly: true,
        path: "/",
    };

    return res
        .status(200)
        .clearCookie("accessToken", "", options)
        .clearCookie("refreshToken", "", options)
        .json(new ApiResponse(200, {}, "Logged out successfully"));
});

//refresh access token
const refreshAccessToken = asyncHandler(async (req, res, next) => {
    const { incomingRefreshToken } =
        req.cookies.refreshToken || req.body.refreshToken;

    //check if refresh token is valid
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        //verify refresh token
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRETE,
        );

        //check if decoded token exists
        const user = await User.findById(decodedToken._id);

        //check if user exists
        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        //check if refresh token is valid
        if (user?.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, "Invalid refresh token");
        }

        //generate access token and refresh token
        const options = {
            httpOnly: true,
            path: "/",
        };

        const { accessToken, newRefreshToken } =
            await generateAccessAndRefreshToken(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, newRefreshToken },
                    "Logged in successfully",
                ),
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

//change current password
const changeCurrentPassword = asyncHandler(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordMatch(currentPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"));
});

//get current user
const getCurrentUser = asyncHandler(async (req, res, next) => {
    return res.status(200).json(200, req.user, "User details");
});

//update account details
const updateAccountDetails = asyncHandler(async (req, res, next) => {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
        throw new ApiError(400, "Please fill all the fields");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            //mongoose update operators
            $set: { fullName, email },
        },
        { new: true },
    ).select("-password ");

    return res.status(200).json(new ApiResponse(200, user, "User updated"));
});

//update profile picture
const updateUserAvatar = asyncHandler(async (req, res, next) => {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Please upload avatar");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading avatar");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { avatar: avatar.url },
        },
        { new: true },
    ).select("-password ");

    return res.status(200).json(new ApiResponse(200, user, "Avatar updated"));
});

const updateUserCoverImage = asyncHandler(async (req, res, next) => {
    const coverImageLocalPath = req.file?.path;

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Please upload cover image");
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!coverImage.url) {
        throw new ApiError(400, "Error while uploading cover image");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { coverImage: coverImage.url },
        },
        { new: true },
    ).select("-password ");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Cover image updated"));
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
};
