import mongoose from "mongoose";
import bcrypt from "bcrypt"; //use preehooksss
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: false, // optional for OAuth (e.g. Google)
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // allow null, unique only when set
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    DOB: {
      type: Date,
      required: false,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },

    // Password reset (email-link flow)
    passwordResetToken: {
      type: String,
      default: null,
    },
    passwordResetExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);


// use of prehooks to use jwt and bcrypt (skip for OAuth users with no password)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken= function() { 
  return jwt.sign( 
  {
    _id: this._id,
    email:this.email,
    username : this.username,
    fullname: this.fullname
  }, process.env.ACCESS_TOKEN_SECRET,{ 
    expiresIn: process.env.ACCESS_TOKEN_EXPRIY}
)}
userSchema.methods.generateRefreshToken= function() { 
  return jwt.sign( 
  {
    _id: this._id,
    email:this.email,
    username : this.username,
    fullname: this.fullname
  }, process.env.REFRESH_TOKEN_SECRET,{
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  }
)}
export const User = mongoose.model("User", userSchema);
