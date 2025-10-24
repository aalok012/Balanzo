import { Router } from "express";
import { loginUser, registerUser, logoutUser} from "../controllers/User.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/register").post(registerUser);


router.route("/login").post(loginUser)

//secured Routes
router.route("/logout").post(verifyJwt, logoutUser)
export default router;
