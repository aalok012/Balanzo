// Express app setup
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/User.routes.js";
import expenseRouter from "./routes/Expense.routes.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes declaration (must match frontend baseURL: VITE_API_URL + /api/v1)
app.use("/api/v1/users", userRouter);
app.use("/api/v1/expenses", expenseRouter);

// Example: http://localhost:8000/api/v1/users/register

export default app;

