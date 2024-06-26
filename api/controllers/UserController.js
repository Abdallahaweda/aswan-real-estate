import Listing from "../models/ListingModel.js";
import User from "../models/UserModel.js";
import { errorHandeler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.send("Welcome to the API");
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandeler(401, "You can only update your own account!"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    return next(errorHandeler(401, "You can only delete your own account!"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

export const getUserLists = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const lists = await Listing.find({ userRef: req.params.id });
      res.status(200).json(lists);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandeler(401, "You can only view your own lisits"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandeler(404, "User not found!"));
    const { password: pass, ...rest } = user._doc;
    res.status(202).json(rest);
  } catch (error) {
    next(error);
  }
};
