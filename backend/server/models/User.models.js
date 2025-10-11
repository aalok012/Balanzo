import mongoose from mongoose

const userSchema = new moongose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
       lowercase: true

    },
    password:{
        type: String,
        required: true,
        createdAt: true,
        updatedAt:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    DOB: {
        type:Number,
        required: true,
        
        
    },
    fullname:
    {
        type: String,
        required:true,
        trim: true,
        index:true
    },
}, {timestamps: true})


export const User = moongose.model("User", userSchema)