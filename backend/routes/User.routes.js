import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
  redirectToGoogle,
  handleGoogleCallback,
  forgotPassword,
  resetPassword,
} from "../controllers/User.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// Password reset (public)
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);

// Google OAuth
router.route("/auth/google").get(redirectToGoogle);
router.route("/auth/google/callback").get(handleGoogleCallback);

// secured routes
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
