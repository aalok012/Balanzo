import Expense from "../models/Expense.models.js"; // Add .js extension
import ApiError  from "../utils/ApiError.js"; // Add .js and check if it's default or named export
import  ApiResponse  from "../utils/ApiResponse.js"; // Add .js and check if it's default or named export
import { asyncHandler } from "../utils/asyncHandler.js"; // Remove the other import

const addExpenseToDb = asyncHandler(async(req, res) => {
    const { amount, description, date, category } = req.body;
     
    if (!(amount && description && date && category)) {
        throw new ApiError(400, "Please fill up the required fields!"); // Changed 401 to 400
    }
    
    const expense = await Expense.create({
        user: req.user._id, // Changed 'user' to 'user' to match your other functions
        amount, 
        description, 
        date,
        category
    });
    
    return res.status(201).json(
        new ApiResponse(201, "Expense successfully saved!", expense)
    );
});

const getAllExpenses = asyncHandler(async(req,res)=>{
   const sortBy = req.query.sort === "category" ? {category:1} : {date:-1}
   const expenses = await Expense.find({ user: req.user._id }).sort(sortBy); // Change 'user' to 'user'
   
   res.status(200).json(
      new ApiResponse(200, "Successfully sorted", expenses)
   )
})

const AmountByCategory = asyncHandler(async(req,res)=>{
   const totalByCat = await Expense.aggregate([
      {$match:{user: req.user._id}},
      {$group:{_id: "$category", totalCat: {$sum: "$amount"}}}
   ])
   
   res.status(200).json(
      new ApiResponse(200, "Amount by category retrieved successfully", totalByCat)
   )
})

const sumAmount = asyncHandler(async(req,res)=>{
   const totalAmt = await Expense.aggregate([
      {$match:{user: req.user._id}}, // Change user to user
      {$group:{_id: null, totalAmt: {$sum: "$amount"}}}
   ])
   
   res.status(200).json(
      new ApiResponse(200, "Total amount retrieved successfully", totalAmt)
   )
})

const monthlyAvg = asyncHandler(async(req,res)=>{
   const monthAvg = await Expense.aggregate([
      {$match:{user: req.user._id}}, // Change user to user
      {$group:{
         _id: {year:{$year:"$date"}, month:{$month:"$date"}},
         avgAmt:{$avg:"$amount"}
      }},
      {$sort: {"_id.year": 1, "_id.month": 1}}
   ])
   
   res.status(200).json(
      new ApiResponse(200, "Monthly average retrieved successfully", monthAvg)
   )
})

const getDatedExpense = asyncHandler(async(req,res)=>{
   const {startDate, endDate, category, sortOrder} = req.query;
   const start = new Date(startDate);
   const end = new Date(endDate);
   const sortDirection = sortOrder === "asc" ? 1 : -1;

   const specificExp = await Expense.aggregate([
      {$match:{
         user: req.user._id,
         category: category,
         date: {$gte: start, $lte: end}
      }},
      {$group:{
         _id: "$category",
         totalAmount:{$sum:"$amount"}
      }},
      {$sort:{"date": sortDirection}}
   ])
   
   res.status(200).json(
      new ApiResponse(200, "Dated expenses retrieved successfully", specificExp)
   )
})

const searchExpense = asyncHandler(async(req,res)=>{
   const {search} = req.body
   const regex = new RegExp(search, "i")
   
   const searchExp = await Expense.aggregate([
      {$match:{
         user: req.user._id,
         category: {$regex: regex}
      }},
      {$group:{
         _id: "$category",
         totalAmount: {$sum:"$amount"},
         count: {$sum: 1},
         latestDate: {$max: "$date"}
      }},
      {$sort:{latestDate:-1}},
      {$project:{
         _id: 0,
         category: "$_id",
         totalAmount: 1,
         latestDate: 1,
         count: 1
      }}
   ])
   
   res.status(200).json(
      new ApiResponse(200, "Search results retrieved successfully", searchExp)
   )
})

const deleteExpense = asyncHandler(async(req,res)=>{
   const expense = await Expense.findById(req.params.id);
   if(!expense) throw new ApiError(404, "Expense not found!");
   
   await Expense.findByIdAndDelete(req.params.id);
   
   res.status(200).json(
      new ApiResponse(200, "Expense deleted successfully", null)
   )
})

const updateExpense =asyncHandler(async(req,res)=>{

const {amount, category, description, date}= req.body

const expense = await Expense.findById(req.params.id);
if(!expense){
  throw new ApiError(404, "Expense not found")
}

//verify that the expense belongs to the user
if (expense.user.toString()!== req.user._id.toString()){
  throw new ApiError(403, "Unauthorized to update this expense!")
}
const updatedExpense = await Expense.findByIdAndUpdate(
  req.params.id, {
    $set:{
      amount:amount||expense.amount,
      category: category||expense.category,
      description: description || expense.description,
      date: date||expense.date
    }
  
},{new: true, runValidators: true})//options
res.status(200).json(
  new ApiResponse(200, "Expense updated successfully", updatedExpense)
); 
})

export {
  addExpenseToDb,
  getAllExpenses,
  AmountByCategory,
  sumAmount,
  monthlyAvg,
  getDatedExpense,
  searchExpense,
  deleteExpense,
  updateExpense
}