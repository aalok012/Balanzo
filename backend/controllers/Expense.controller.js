import Expense from "../models/Expense.models";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const addExpense = asyncHandler(async(req,res)=>{
    const {amount,description,date,category} = req.body;
     
    if(!(amount&&description&&date&&category)){
        throw new ApiError(401,"Please fill up the required fields!")
    }
    //create an object 
    try {
        const expense = await Expense.create({
            user:req.user._id, // link to the logged-in user
            amount, 
            description, 
            date,
            category
        })
        
        return res.status(201).json(
            new ApiResponse(201, "Expense successfully saved!", expense)
          );
        
    } catch (error) {
        throw new ApiError(400, error?.message||"Something went wrong while saving the data!")
    }
})