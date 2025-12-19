import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

/**
 * Cookie options that work:
 * - HTTP now (secure=false) for your EC2 IP
 * - HTTPS later (secure=true) automatically when NODE_ENV=production
 */
const getCookieOptions = () => {
  const isProd = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProd, // ✅ HTTP dev: false, HTTPS prod: true
    sameSite: isProd ? "none" : "lax",
    path: "/",
    // Optional: set domain when you have a real domain
    // domain: isProd ? process.env.COOKIE_DOMAIN : undefined,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found while generating tokens");

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    // ✅ Fix: correct option name
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, error?.message || "Error generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email, fullname, DOB } = req.body;

  const normalizedUsername = username?.trim().toLowerCase();
  const normalizedEmail = email?.trim().toLowerCase();
  const normalizedFullname = fullname?.trim();

  if (!normalizedUsername || !password || !normalizedEmail || !normalizedFullname) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ username: normalizedUsername }, { email: normalizedEmail }],
  });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const newUser = await User.create({
    username: normalizedUsername,
    password,
    email: normalizedEmail,
    fullname: normalizedFullname,
    DOB,
  });

  const createdUser = await User.findById(newUser._id).select("-password -refreshToken");
  if (!createdUser) throw new ApiError(500, "User creation failed");

  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", createdUser));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const normalizedEmail = email?.trim().toLowerCase();
  const normalizedUsername = username?.trim().toLowerCase();

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  if (!normalizedUsername && !normalizedEmail) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [
      normalizedUsername ? { username: normalizedUsername } : null,
      normalizedEmail ? { email: normalizedEmail } : null,
    ].filter(Boolean),
  });

  if (!user) {
    throw new ApiError(404, "User not found! Please register first!");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = getCookieOptions();

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "User logged in successfully", {
        user: loggedInUser,
        accessToken,  // you can remove these later if you want cookie-only auth
        refreshToken, // you can remove these later if you want cookie-only auth
      })
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  // req.user must be set by auth middleware
  if (!req.user?._id) throw new ApiError(401, "Unauthorized");

  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshToken: "" } },
    { new: true }
  );

  const options = getCookieOptions();

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User logged out successfully", {}));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token missing");
  }

  try {
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded?._id);
    if (!user) throw new ApiError(401, "Invalid refresh token");

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token expired or already used");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const options = getCookieOptions();

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, "Access token refreshed", {
          accessToken,
          refreshToken,
        })
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
