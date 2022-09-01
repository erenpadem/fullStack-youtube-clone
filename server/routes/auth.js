import express from "express";
import { createUser, signIn, googleAuth, logout } from "../controllers/auth.js";


const router = express.Router();
router.post("/google", googleAuth);
router.post("/signup", createUser);
router.post("/signin", signIn);
router.get("/logout",logout);

export default router;
