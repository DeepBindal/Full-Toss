import User from "../models/user.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import jwt from 'jsonwebtoken';

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.AccessToken || req.header("Authorization")?.replace("Bearer ", "");
    if(!token){
        throw new CustomError("Unauthorized request", 401);
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if(!user){
        throw new CustomError("Invalid Access Token", 401);
    }
    req.user = user;
    next();
})