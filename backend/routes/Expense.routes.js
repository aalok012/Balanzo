import { Router } from "express";
import {
    addExpenseToDb,
    getAllExpenses,
    AmountByCategory,
    sumAmount,
    monthlyAvg,
    getDatedExpense,
    searchExpense,
    deleteExpense,
    updateExpense
} from "../controllers/Expense.controller.js";

import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();


router.route("/addExpenseToDb").post(verifyJwt, addExpenseToDb);
router.route("/getAllExpenses").get(verifyJwt, getAllExpenses);
router.route("/AmountByCategory").get(verifyJwt, AmountByCategory);
router.route("/sumAmount").get(verifyJwt, sumAmount);
router.route("/monthlyAvg").get(verifyJwt, monthlyAvg);
router.route("/getDatedExpense").get(verifyJwt, getDatedExpense);
router.route("/searchExpense").post(verifyJwt, searchExpense);
router.route("/:id").put(verifyJwt, updateExpense);
router.route("/:id").delete(verifyJwt, deleteExpense);

export default router;
