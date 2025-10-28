import Expense from "../models/Expense.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addExpense = asyncHandler(async (req, res) => {
  const { amount, description, date, category } = req.body;

  if (!(amount && description && date && category)) {
    throw new ApiError(401, "Please fill up the required fields!");
  }

  try {
    const expense = await Expense.create({
      user: req.user._id, // link to the logged-in user
      amount,
      description,
      date,
      category,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, expense, "Expense successfully saved!"));
  } catch (error) {
    throw new ApiError(
      400,
      error?.message || "Something went wrong while saving the data!"
    );
  }
});

const getAllExpenses = asyncHandler(async (req, res) => {
  try {
    const sortBy = req.query.sort === "category" ? { category: 1 } : { date: -1 };
    const expenses = await Expense.find({ user: req.user._id }).sort(sortBy);
    return res
      .status(200)
      .json(new ApiResponse(200, expenses, "Expenses fetched successfully"));
  } catch (error) {
    throw new ApiError(
      400,
      error?.message || "Something went wrong while fetching expenses"
    );
  }
});

const getCalcs = asyncHandler(async (req, res) => {
  try {
    const matchStage = { $match: { user: req.user._id } };

    const [totalByCategory, totals, monthlyAverages, dailyAverageAgg] =
      await Promise.all([
        // Total per category
        Expense.aggregate([
          matchStage,
          { $group: { _id: "$category", total: { $sum: "$amount" } } },
          { $sort: { total: -1 } },
        ]),

        // Overall totals
        Expense.aggregate([
          matchStage,
          {
            $group: {
              _id: null,
              totalAmount: { $sum: "$amount" },
              count: { $sum: 1 },
            },
          },
        ]),

        // Monthly averages per (year, month)
        Expense.aggregate([
          matchStage,
          {
            $group: {
              _id: { year: { $year: "$date" }, month: { $month: "$date" } },
              avgAmount: { $avg: "$amount" },
              totalAmount: { $sum: "$amount" },
              count: { $sum: 1 },
            },
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } },
        ]),

        // Average daily spend across days with spending
        Expense.aggregate([
          matchStage,
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
              dayTotal: { $sum: "$amount" },
            },
          },
          { $group: { _id: null, dailyAverage: { $avg: "$dayTotal" } } },
        ]),
      ]);

    const result = {
      totalByCategory,
      monthlyAverages,
      dailyAverage: dailyAverageAgg?.[0]?.dailyAverage ?? 0,
      totalAmount: totals?.[0]?.totalAmount ?? 0,
      totalCount: totals?.[0]?.count ?? 0,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, result, "Calculations fetched successfully"));
  } catch (error) {
    throw new ApiError(400, error?.message || "Failed to compute calculations");
  }
});

export { addExpense, getAllExpenses, getCalcs };

