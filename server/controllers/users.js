import asyncErrorWrapper from "express-async-handler";
import { createError } from "../error.js";
import { sendJwtToClient } from "../helpers/token/tokenHelpers.js";
import User from "../model/User.js";
import Video from "../model/Video.js";

export const likeVideo = asyncErrorWrapper(async (req, res, next) => {
  const id = req.user.id;
  const {videoId} = req.params;

  await Video.findByIdAndUpdate(videoId,{$addToSet:{likes:id},$pull:{dislikes:id}})
  res.status(200).json({message:"video has been liked"})
});
export const dislikeVideo = asyncErrorWrapper(async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;

  await Video.findByIdAndUpdate(videoId,{$addToSet:{dislikes:id},$pull:{likes:id}})
  res.status(200).json({message:"video has been disliked"})
});
export const Subscribe = asyncErrorWrapper(async (req, res, next) => {

  await User.findByIdAndUpdate(req.user.id,{
    $addToSet:{subscribedUsers:req.params.id}
  })
  await User.findByIdAndUpdate(req.params.id,{
    $inc:{subscribers:1}
  })
  res.status(200).json({message:"subscription successfull"});
});
export const unSubscribe = asyncErrorWrapper(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id,{
    $pull:{subscribedUsers:req.params.id}
  })
  await User.findByIdAndUpdate(req.params.id,{
    $inc:{subscribers: -1}
  })
  res.status(200).json({message:"Unsubscription successfull"});
});
export const getUser = asyncErrorWrapper(async (req, res, next) => {

  const user = await User.findById(req.params.id);
  const {password,...others} = user._doc;
  res.status(200).json(others)
});
export const updateUser = asyncErrorWrapper(async (req, res, next) => {
  console.log(req.body)
  console.log(req.params.id)
  if (req.params.id !== req.user.id)
    return next(createError(401, "you cant update this account"));

  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  await updateUser.save()
  const user = await User.findById(req.params.id)
  sendJwtToClient(user,res)
});

export const deleteUser = asyncErrorWrapper(async (req, res, next) => {
  if (req.params.id !== req.user.id)
    return next(createError(401, "you cant delete this account"));

  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ messagge: "success" });
});

