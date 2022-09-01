import express from "express";
import videoRouter from "./videos.js";
import userRouter from "./users.js";
import authRouter from "./auth.js";
import commentsRouter from "./comments.js";

const router = express.Router();

router.use("/video", videoRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/comments", commentsRouter);



export default router;
