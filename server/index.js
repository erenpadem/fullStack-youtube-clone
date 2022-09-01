import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import mongoose from "mongoose";
import CustomErrorHandler from "./middleWares/error/CustomErrorHandler.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express();
dotenv.config({
  path: "./config/env/.env",
});

const PORT = process.env.PORT;
app.use(cookieParser())
app.use(cors());
app.use(express.json());
app.use(CustomErrorHandler);
app.use("/api", router);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";
  return res.status(status).json({ message, status, success: "false" });
});
app.listen(PORT, (err) => {
  if (err) console.log("Error in server setup");
  console.log(`server listening on ${PORT}`);
});

mongoose
  .connect(process.env.MONGOURL)
  .then((response) => console.log("successfully connected to db"))
  .catch((error) => console.error(error));
