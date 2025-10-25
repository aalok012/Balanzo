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
      required: true,
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
  },
  { timestamps: true }
);


//use of prehooks to use jwt and bcrypt
userSchema.pre('save', async function(next){
  if(!this.isModified("password")) return next() // only if password is modified otherwise it runs the code again and again
this.password= await bcrypt.hash(this.password, 12)
});

userSchema.methods.isPasswordCorrect= async function (password) { //read mongoose definition for the methods
  return await bcrypt.compare(password, this.password); //gives the boolean value 

}
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
