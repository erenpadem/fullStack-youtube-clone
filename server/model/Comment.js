import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  userId : {
    type:String,
    required: true,
  },
  videoId : {
    type:String,
    required: true,
  },
  desc : {
    type:String,
    required: true,
  },
  likes : {
  type:[String],
  default:[]
  },
  dislikes : {
  type:[String],
  default:[]
  },
 
  
},{timeStamps:true});


export default mongoose.model("Comment", CommentSchema);;
