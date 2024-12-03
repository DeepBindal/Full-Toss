import User from "../models/user.js";
import CustomError from "./CustomError.js"

export const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const AccessToken = user.generateAccessToken();
        const RefreshToken = user.generateRefreshToken()

        user.refreshToken = RefreshToken
        await user.save({validateBeforeSave: false});

        return {AccessToken, RefreshToken}
    } catch (error) {
        throw new CustomError("Something went wrong", 500);
    }
}