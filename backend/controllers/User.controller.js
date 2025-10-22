import {asyncHandler} from "../utils/asyncHandler.js"
import mongoose from "mongoose";
import { User } from "../models/User.models.js";


const registerUser = asyncHandler (async(req, res)=> {  //use of wrapper asynchandler function.
        return  res.status(300).json ({
            message: "GOOD)"
         })
})

export {registerUser}