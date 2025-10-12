import mongoose from "mongoose";
 const expenseSchema = new mongoose.model({
    expenseAmount: {
        type: Schema.Types.objectId,
        ref: User,
        required: true
        
    },
    Description:{
        type: string,

    },
    Date: {
        type: Number,
        required: true,
    },
    Category:{
        type: string,
        reuired: true
    }

 })