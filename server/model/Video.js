import mongoose from "mongoose";

const { Schema } = mongoose;

const VideoSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
      unique: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
    img: {
      type: String,
    },
  
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("Video", VideoSchema);
