import {asyncHandler} from "../utils/asyncHandler.js"
import mongoose from "mongoose";
import { User } from "../models/User.models.js";
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"


const generateAccessandRefreshToken= async (userId){
        try {
                 
        } catch (error) {
                
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
                username: username.toLowercase(),
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
                new ApiResponse(200, createdUser, "User registered successfully!")
        )
        
})
 

 const loginUser = asyncHandler (async(req,res) => {
       //take the inputs from the user
       const{username, password}=req.body ;
        
       if(!username|| !email){
        throw new ApiError(404, "Username or password is required!")
       }


        //look for that in database
        const findUSer= await User.findOne({$or: [{ username }, { email}]});
       
       //if that matches given then move ahead or error
        if (!findUser){
        throw new ApiError(404, "User not found! Please register first!")
       }

       //check for password in the db and handle error
       const isPasswordValid= await findUSer.isPasswordCorrect(password)

       if(!isPasswordValid){
        throw new ApiError(404, "The password you entered is incorrect!")

       }


 })
 


















export {registerUser, loginUser}