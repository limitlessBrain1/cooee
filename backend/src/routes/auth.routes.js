import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { loginUser, verifyToken, registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", authMiddleware, verifyToken);

export default router;