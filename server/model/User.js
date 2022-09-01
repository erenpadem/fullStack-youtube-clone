import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    subscribedUsers: {
      type: [String],
      default: [],
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    img: {
      type: String,
    },
    fromGoogle:{
      type:Boolean,
      default:false
    }
  },
  { timeStamps: true }
);

UserSchema.methods.generateJwtFromUser = function() {
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
  const payload = {
    id: this.id,
    name: this.name,
    email: this.email,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE,
  });

  return token;
}



export default mongoose.model("User", UserSchema);
