import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiErrors.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        //get token from header
        const token =
            req.cookies?.accessToken ||
            req.headers("Authorization")?.replace("Bearer ", "");

        //check if token exists
        if (!token) {
            return next(
                new ErrorResponse(
                    401,
                    "You are not authorized to access this route",
                ),
            );
        }

        //verify token
        const decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRETE,
        );

        //check if user exists
        const user = User.findById(decodedToken._id).select(
            "-password -refreshToken",
        );

        if (!user) {
            throw new ErrorResponse(
                401,
                "You are not authorized to access this route",
            );
        }

        //set user in req object
        req.user = user;

        next();
    } catch (error) {
        throw new ApiError(
            401,
            error?.message || "You are not authorized to access this route",
        );
    }
});
