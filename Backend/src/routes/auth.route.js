import express from "express"
import { Login, Logout, Signup, updateProfilePic, checkAuth  } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router()

router.post("/Signup", Signup);

router.post("/Login", Login);

router.post("/Logout", Logout);

router.put("/updateProfilePic", protectRoute, updateProfilePic);

router.get("/check", protectRoute, checkAuth)

export default router; 