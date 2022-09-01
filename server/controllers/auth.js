
import asyncErrorWrapper from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../model/User.js";
import { createError } from "../error.js";
import { comparePassword } from "../helpers/Input/InputHelpers.js";
import { sendJwtToClient } from "../helpers/token/tokenHelpers.js";
export const createUser = asyncErrorWrapper(async (req, res, next) => {
  const { password, ...props } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = await  User.create({ ...props, password: hash });
  await newUser.save();
  sendJwtToClient(newUser,res)
});

export const signIn = asyncErrorWrapper(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(createError(500, "User not found"));
  if (!comparePassword(req.body.password, user.password)) {
    return next(createError(500, "Your password is incorrect"));
  }
  sendJwtToClient(user,res)
});

export const googleAuth = asyncErrorWrapper(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    sendJwtToClient(user, res);
  } else {
    const newUser = new User({ ...req.body, fromGoogle: true });
    const savedUser = await newUser.save();
    sendJwtToClient(savedUser,res)
}});
export const logout = async (req, res, next) => {
  res
    .status(200)
    .cookie({
      expires: new Date(Date.now()),
    })
    .json({ message: "succesfully logged out" });
};
