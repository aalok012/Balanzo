// Express app setup
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/User.routes.js";
import expenseRouter from "./routes/Expense.routes.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes declaration
app.use("/api/v1/users", userRouter); // if the user types /users the control goes to the userRouter.
app.use("/api/v1/expenses" ,expenseRouter) // if the user types/ expense the control goes to the expenseRouter

//Example of the direction of route
// http://localhost:8000/api/v1/users/register

export default app;
