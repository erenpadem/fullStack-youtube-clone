import asyncErrorWrapper from "express-async-handler";
import { createError } from "../error.js";
import Comment from "../model/Comment.js";
import Video from "../model/Video.js";
import User from "../model/User.js";
export const addComment = asyncErrorWrapper(async (req, res, next) => {
  const { ...others } = req.body;
 
  const newComment = new Comment({ ...others, userId: req.user.id });

  const savedComment = await newComment.save();

  res.status(200).json({ data: savedComment });
});

export const getComments = asyncErrorWrapper(async (req, res, next) => {
  const comments = await Comment.find({ videoId: req.params.videoId });
  res.status(200).json({ data: comments });
});

export const deleteComment = asyncErrorWrapper(async (req, res, next) => {

  const comment = await Comment.findById({ _id: req.params.id });
  console.log(req.user.id)
  const video = await Video.findById({ _id: req.params.id });
  if (comment.userId === req.user.id || video.userId === req.user.id) {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "comment deleted" });
  } else {
    return next(
      createError(401, "you do not have permission to delete this comment")
    );
  }
  res.status(200).json({ message: "comment deleted" });
});

export const updateComment = asyncErrorWrapper(async (req, res, next) => {
  const {id} = req.params;
  const {desc} = req.body;
 const commentId = await Comment.findById(id);
 const user = await User.findById({_id:commentId.userId})
 if(user._id == req.user.id) {
  const comment = await Comment.findByIdAndUpdate({ _id:id },{
    desc:desc
   },{new:true});
   res.status(200).json({success:true,data:comment})
 } else {
   return next(createError(401, "you do not have permission to update this comment"))
 }
})
