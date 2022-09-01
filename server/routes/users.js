import express from "express";
import {
  deleteUser,
  dislikeVideo,
  getUser,
  likeVideo,
  Subscribe,
  unSubscribe,
  updateUser,
} from "../controllers/users.js";
import getAccessToRoute from "../middlewares/auth/Authorization.js";


const router = express.Router();
router.put("/:id", getAccessToRoute, updateUser);
router.delete("/:id", getAccessToRoute, deleteUser);
router.put("/sub/:id", getAccessToRoute, Subscribe);
router.put("/unsub/:id", getAccessToRoute, unSubscribe);
router.put("/like/:videoId", getAccessToRoute, likeVideo);
router.put("/dislike/:videoId", getAccessToRoute, dislikeVideo);
router.get("/find/:id", getUser);

export default router;
