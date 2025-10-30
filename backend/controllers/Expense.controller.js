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

const getAllExpenses = asyncHandler(async(req,res)=>{

   try {
     const sortBy= await req.query.sort=== "category"? {category:1} : {date:-1}
      const expenses= await Expense.find({ user: req.user._id }).sort(sortBy);
 
      res.status(204).json(
         new ApiResponse(200, "Successfully sorted", expenses)
      )
   } catch (error) {
    throw new ApiError(400,"Something went wrong while sorting!")
   }
   
})

const getCalcs= asyncHandler(async(req,res)=>{

//return total expenses, average expense, daily average, highest, ...

   const totalByCat=  await Expense.aggregate
([  {$match:{userId: req.user._id}},
    {$group:{_id: "category", totalCat: { $sum: "$amount"}},}
])

const totalAmt= await Expense.aggregate
([  {$match:{userId: req.user._id}},
    {$group:{_id: null, totalAmt: { $sum: "$amount"}},}
])


const monthAvg= await Expense.aggregate([
    {$match:{userId: req.user._id}},
    {$group:{_id:null,year:{$year:"$date"}, month:{$month:"$date"}}},
    {avgAmt:{$avg:"$amount"}},
    { $sort: { "_id.year": 1, "_id.month": 1 } }
])

  const start = new Date(startDate);
  const end = new Date(endDate);
  const sortDirection = sortOrder === "asc" ? 1 : -1;

  const specificExp= await Expense.aggregate([
    {$match:{
        userId: req.user._id,
        category:category,
        date: { $gte: start, $lte: end }
     }

    },
     { $group:{
        _id:"category",
        totalAmount:{$sum:"$amount"}
     }

     },

     { sort:{"date":sortDirection} }
    

    ])


    const {search}= req.body
    const regex = new RegExp(search,  "i") //i is case sensitive so reverse it using js method
    const searchExp= await Expense.aggregate([
      { 
        $match:{
        userId:req.user._id,
        category:{$regex:regex}
      }
      },

      {
        $group:{

            _id: $category,
            totalAmount:{$sum:"$amount"},
            count: {$sum: 1},
            latestDate:{$max: "$date"},
        }
      },
      {sort:{latestDate:-1}},
      {
        $project:{
            _id:0,
            category: "_id",
            totalAmount:1,
            latestDate:1,
            count:1
        }
      }

    ])


})