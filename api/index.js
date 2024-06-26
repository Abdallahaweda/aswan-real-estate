import express from "express";
import mongoose from "mongoose";
import dontenv from "dotenv";
import userRouter from "./routes/UserRoute.js";
import authRouter from "./routes/AuthRoute.js";
import listinRouter from "./routes/listingRoute.js";
import cookieParser from "cookie-parser";
import path from "path";

dontenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listinRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
