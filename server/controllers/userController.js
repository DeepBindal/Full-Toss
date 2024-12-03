import User from "../models/user.js";
import CustomError from "../utils/CustomError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAccessAndRefreshToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";
import { getRandomTeam, IPL_TEAMS } from "../constants/index.js";

export const registerUser = async (req, res) => {
  const { username, email, password, city } = req.body;
  if (!username) throw new CustomError("Missing Username", 400);
  if (!email) throw new CustomError("Missing Email", 400);
  if (!password) throw new CustomError("Missing Password", 400);
  if (!city) throw new CustomError("Missing City", 400);

  const existingUser = await User.find({ email: email });

  if (existingUser.length > 0) {
    throw new CustomError("User already exists. Use different email", 400);
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new CustomError(
      "Username already exists. Choose a different username.",
      400
    );
  }

  const iplTeam = IPL_TEAMS[city] || getRandomTeam();

  const user = await User.create({
    email,
    password,
    username: username.toLowerCase(),
    iplTeam: iplTeam,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new CustomError(
      "Something went wrong while registering the user",
      500
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "User registered Successfully"));
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) throw new CustomError("Missing Email", 404);
  if (!password) throw new CustomError("Missing Password", 404);

  const user = await User.findOne({ email });
  if (!user) throw new CustomError("User does not exist", 404);

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new CustomError("Passwords dont match ", 404);

  const { AccessToken, RefreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("AccessToken", AccessToken, options)
    .cookie("RefreshToken", RefreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken: AccessToken,
        },
        "User saved successfully"
      )
    );
};

export const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
};

export const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new CustomError("Unauthorized", 401);
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken?._id);
  if (!user) {
    throw new CustomError("Unauthorized", 401);
  }
  if (incomingRefreshToken !== user.refreshToken) {
    throw new CustomError("Token is expired", 401);
  }
  const options = {
    httpOnly: true,
    secure: true,
  };

  const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken: newRefreshToken },
        "Access token refreshed"
      )
    );
};

export const testUser = (req, res) => {
  res.json(new ApiResponse(200, "Authorized"));
};

export const fetchUser = async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );
  res.json(new ApiResponse(200, user));
};

export const updateUserTeam = async (req, res) => {
  const {team} = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { iplTeam: team } },
    {
      new: true,
    }
  ).select("-password -refreshToken");
  res.json(new ApiResponse(200, user));
};
