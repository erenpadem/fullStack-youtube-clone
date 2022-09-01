import asyncErrorWrapper from "express-async-handler";
import { createError } from "../error.js";
import User from "../model/User.js";
import Video from "../model/Video.js";

export const createVideo = asyncErrorWrapper(async (req, res, next) => {
  const newVideo = await Video.create({ userId: req.user.id, ...req.body });
  await newVideo.save();
  res.status(200).json({ data: newVideo });
});

export const deleteVideo = asyncErrorWrapper(async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  if (!video) return next(createError(404, "video not found"));
  if (video.userId !== req.user.id)
    return next(
      createError(401, "you are not have permission to delete this video")
    );
  await Video.findByIdAndDelete(video._id);
  res.status(200).json({ message: "succesfully deleted" });
});

export const editVideo = asyncErrorWrapper(async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  if (video.userId !== req.user.id)
    next(createError(401, "you are not have permission to delete this video"));
  const updatedVideo = await Video.findByIdAndUpdate(
    video._id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json({ data: updatedVideo });
});

export const getVideo = asyncErrorWrapper(async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  res.status(200).json({ data: video });
});

export const addView = asyncErrorWrapper(async (req, res, next) => {
  const video = await Video.findByIdAndUpdate(req.params.id, {
    $inc: { views: 1 },
  });
  res.status(200).json({ data: video });
});
export const random = asyncErrorWrapper(async (req, res, next) => {
  const videos = await Video.aggregate([{ $sample: { size: 400 } }]);
  res.status(200).json(videos);
});
export const trend = asyncErrorWrapper(async (req, res, next) => {
  const videos = await Video.find().sort({ views: -1 });
  res.status(200).json(videos);
});
export const subscribed = asyncErrorWrapper(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const subscribed = user.subscribedUsers;

  const list = await Promise.all(
    subscribed.map((channelId) => Video.find({ userId: channelId }))
  );
  res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
});

export const getByTag = asyncErrorWrapper(async (req, res, next) => {
  const tags = req.query.tags.split(",");

  const videos = await Video.find({ tags: { $in: tags } }).limit(20);
  res.status(200).json({ data: videos });
});
export const getBySearch = asyncErrorWrapper(async (req, res, next) => {
  const query = req.query.q;
  const videos = await Video.find({
    title: { $regex: query, $options: "i" },
  }).limit(40);
  console.log(videos);
  res.status(200).json({ data: videos });
});


