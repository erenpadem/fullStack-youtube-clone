import express from "express";
import {
  getComments,
  addComment,
  deleteComment,
  updateComment,
} from "../controllers/comments.js";
import getAccessToRoute from "../middlewares/auth/Authorization.js";

const router = express.Router();

router.post("/", getAccessToRoute, addComment);
router.delete("/:id", getAccessToRoute, deleteComment);
router.put("/:id", getAccessToRoute, updateComment);
router.get("/:videoId", getComments);

export default router;
