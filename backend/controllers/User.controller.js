import {asyncHandler} from "../utils/asyncHandler.js"
import mongoose from "mongoose";
import { User } from "../models/User.models.js";
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { sendEmail } from "../utils/sendEmail.js"


const generateAccessandRefreshToken= async (userId) => {
        try {
                 const user = await User.findById(userId)
                 const accessToken= await user.generateAccessToken()
                 const refreshToken= await user.generateRefreshToken()


                 user.refreshToken= refreshToken;
                 await user.save({ValiditeBeforeSave: false }) //while saving not to kick in every method in mongoose

                return {accessToken, refreshToken}

        } catch (error) {
                throw new ApiError(500, "Somenthing went wrong while generating refresh and access token")
        }
}

const registerUser = asyncHandler (async(req, res)=> {  
        
        //use of wrapper asynchandler function.
        // return  res.status(300).json ({
        //     message: "GOOD)"
        //  })


        //get the user details from the frontend
        console.log(req.body);
        const {username, password, email, fullname, DOB}= req.body;



        // check for the validaty of username, password , email and others
        if(!username || !password || !email || !fullname){
           throw new ApiError(400, "All field are required")
        }


        //after checking validity check for the user already exists
        const existingUser = await User.findOne({ $or:[{username}, {email} ]});
        if(existingUser){
                throw new ApiError(404, "User already exists!")
                }
        


        //create an object - create entry in db 
        const newUSer= await User.create({
                username: username.toLowerCase(),
                password,
                email,
                fullname,
                DOB,
        });

        
        //to check in the db to verify the created user.
        const createdUser = await User.findById(newUSer._id).select("-password -refreshToken");

        /**************************************************************************/
         //(alternate method)remove password and refresh token field from response
        // const userResponse = newUSer.toObject();
        // delete userResponse.password;
        /**************************************************************************/


        //check for user creation 
        if(!createdUser) {
                throw new ApiError(404, "User not created for some reason!")
        }
        
        //return response 
        return res.status(201).json(
                new ApiResponse(200, "User registered successfully!", createdUser)
        )
        
})
 

 const loginUser = asyncHandler (async(req,res) => {
       //take the inputs from the user
       const{email, username, password}=req.body ;
        console.log(email)

       if(!(username || email)){
        throw new ApiError(404, "Username or password is required!")
       }


        //look for that in database
        const user= await User.findOne({$or: [{ username }, { email}]});
       
       //if that matches given then move ahead or error
        if (!user){
        throw new ApiError(404, "User not found! Please register first!")
       }

       //check for password in the db and handle error
       const isPasswordValid= await user.isPasswordCorrect(password);

       if(!isPasswordValid){
        throw new ApiError(404, "The password you entered is incorrect!")
       }

       const {accessToken, refreshToken} = await generateAccessandRefreshToken(user._id)
        
       const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

       const options = {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
       }

       return res.status(200)  // Changed 202 to 200
       .cookie("accessToken", accessToken, options)
       .cookie("refreshToken", refreshToken, options)
       .json(
        new ApiResponse(
            200, 
            "User logged in successfully",
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            }
        )
       )
})


const logoutUser = asyncHandler(async(req,res)=>{
        await User.findByIdAndUpdate(req.user._id,{
                $set:{refreshToken:""}, new:true
})

        const options={
                httpOnly: true,
                secure: false,
                sameSite: "lax",
        }
        return res.status(204)
        .clearCookie("accessToken", options) //options cause it was passed in creating cookies
        .clearCookie("refreshToken", options) //options cause it was passed in creating cookies
        .json(
                new ApiResponse(200, {
                }, "User logged out successfully")
        )

})
const refreshAccessToken= asyncHandler( async (req,res) => {


   const incomingRefreshToken = req.cookies.refreshToken ||req.body.refreshToken
   if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request!")
   }
   try {
        const decodedToken=  jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET) //we verified the incoming token from the user website
         const user = await User.findById(decodedToken?._id)
         
         
         if(!user){
             throw new ApiError(401, "Invalid refresh token!!")
     
         }
     
         if (incomingRefreshToken!= user?.refreshToken)
         {
             throw new ApiError(400,"Refresh token is Invalid or used token !")
         }
     
         const options={
             httpOnly:true,
             secure: false,
             sameSite: "lax",
         }
         const {accessToken, refreshToken}= await generateAccessandRefreshToken(user._id)
     
         return res.status(204)
         .cookie("accessToken", accessToken, options)
         .cookie("refreshToken", newRefreshToken, options)
         .json(
            new ApiResponse(200,{accessToken, newRefreshToken}, "Access token refreshed! ")
         )
   } catch (error) {
        throw new ApiError(400, error?.message|| "invalid refresh token")
   }



})

// Google OAuth: redirect user to Google consent screen
const redirectToGoogle = asyncHandler(async (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_CALLBACK_URL;
  if (!clientId || !redirectUri) {
    throw new ApiError(500, "Google OAuth is not configured (GOOGLE_CLIENT_ID / GOOGLE_CALLBACK_URL)");
  }
  const scopes = ["openid", "email", "profile"].map((s) => encodeURIComponent(s)).join(" ");
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scopes}&access_type=offline&prompt=consent`;
  res.redirect(url);
});

// Google OAuth: handle callback (exchange code for tokens, get user, create session)
const handleGoogleCallback = asyncHandler(async (req, res) => {
  const { code } = req.query;
  const frontendUrl = process.env.FRONTEND_URL || "https://balanzo.tech";
  if (!code) {
    return res.redirect(`${frontendUrl}/login?error=no_code`);
  }
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_CALLBACK_URL;
  if (!clientId || !clientSecret || !redirectUri) {
    return res.redirect(`${frontendUrl}/login?error=oauth_not_configured`);
  }
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });
  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    console.error("Google token error:", err);
    return res.redirect(`${frontendUrl}/login?error=token_exchange_failed`);
  }
  const tokens = await tokenRes.json();
  const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  if (!userInfoRes.ok) {
    return res.redirect(`${frontendUrl}/login?error=userinfo_failed`);
  }
  const profile = await userInfoRes.json();
  const { id: googleId, email, name } = profile;
  if (!email) {
    return res.redirect(`${frontendUrl}/login?error=no_email`);
  }
  let user = await User.findOne({ $or: [{ googleId }, { email: email.toLowerCase() }] });
  if (!user) {
    const baseUsername = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
    let username = baseUsername;
    let suffix = 0;
    while (await User.findOne({ username })) {
      suffix += 1;
      username = `${baseUsername}${suffix}`;
    }
    user = await User.create({
      googleId,
      email: email.toLowerCase(),
      fullname: name || email,
      username,
      password: undefined,
    });
  } else if (!user.googleId) {
    user.googleId = googleId;
    await user.save({ validateBeforeSave: false });
  }
  const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id);
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
  const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" };
  res
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .redirect(`${frontendUrl}/auth/callback?token=${accessToken}&user=${encodeURIComponent(JSON.stringify(loggedInUser))}`);
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const normalized = String(email || "").trim().toLowerCase();

  // Always return a generic message (avoids email enumeration).
  if (!normalized) {
    return res
      .status(200)
      .json(new ApiResponse(200, "If that email exists, a reset link will be sent.", {}));
  }

  const user = await User.findOne({ email: normalized });

  if (user) {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await user.save({ validateBeforeSave: false });

    const frontendUrl =
      process.env.FRONTEND_URL ||
      (process.env.NODE_ENV === "production" ? "https://balanzo.tech" : "http://localhost:5173");

    const resetUrl = `${frontendUrl}/reset-password?token=${rawToken}`;

    // Production behavior: send the link via email (no dev link in UI).
    // If SMTP is not configured, we fail loudly so it can be fixed.
    const subject = "Reset your Balanzo password";
    const text =
      `You requested a password reset.\n\n` +
      `Reset your password using this link (valid for 15 minutes):\n${resetUrl}\n\n` +
      `If you didn’t request this, you can ignore this email.`;

    const html =
      `<p>You requested a password reset.</p>` +
      `<p><a href="${resetUrl}">Click here to reset your password</a> (valid for 15 minutes).</p>` +
      `<p>If you didn’t request this, you can ignore this email.</p>`;

    await sendEmail({ to: normalized, subject, text, html });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "If that email exists, a reset link will be sent.", {}));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const rawToken = String(token || "").trim();
  const newPassword = String(password || "");

  if (!rawToken || !newPassword) {
    throw new ApiError(400, "Token and new password are required.");
  }
  if (newPassword.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters.");
  }

  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new ApiError(400, "Reset link is invalid or expired.");
  }

  user.password = newPassword;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Password reset successfully.", {}));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  redirectToGoogle,
  handleGoogleCallback,
  forgotPassword,
  resetPassword,
};
