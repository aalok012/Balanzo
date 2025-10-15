// Express app setup
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/User.routes.js";
import expenseRoutes from "./routes/Expense.routes.js";

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

// Simple health endpoint
app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

// API routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/expenses", expenseRoutes);

export default app;
