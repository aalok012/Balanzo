import mongoose from "mongoose";
//use preehooksss
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
  },
  { timestamps: true }
);


//use of prehooks to use jwt and bcrypt
userSchema.pre('save', async function(next){
  if(this.isModified("password")) return next()
this.password= bcrypt.hash(this.password, 12)
});

userSchema.methods.generateAccessToken= function() { 
  return jwt.sign( 
  {
    _id: this._id,
    email:this.email,
    username : this.username,
    fullname: this.fullname
  }, 
)}

export const User = mongoose.model("User", userSchema);
