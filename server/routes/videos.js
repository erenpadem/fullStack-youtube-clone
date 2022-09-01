import express from "express";
import {
  createVideo,
  deleteVideo,
  editVideo,
  getVideo,
  addView,
  random,
  trend,
  subscribed,
  getByTag,
  getBySearch
} from "../controllers/videos.js";


import getAccessToRoute from "../middlewares/auth/Authorization.js";

const router = express.Router();

router.get("/find/:id", getVideo);
router.get("/sub", getAccessToRoute,subscribed);
router.get("/random", random);
router.get("/trend", trend);
router.get("/view/:id",getAccessToRoute, addView);
router.get("/tags", getByTag);
router.get("/search", getBySearch);
router.delete("/:id", getAccessToRoute, deleteVideo);
router.put("/:id", getAccessToRoute, editVideo);
router.post("/", getAccessToRoute, createVideo);

export default router;
