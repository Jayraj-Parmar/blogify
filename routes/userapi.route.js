import express from "express";
import {
  handleSignUp,
  handleSignIn,
  handleLogOut,
  handelResetPassword,
  handleForgotPassword,
  handleUpdatePassword,
} from "../controllers/userapi.controller.js";
import user from "../models/user.model.js";
import checkDuplicate from "../middlewares/checkduplicate.js";
import checkFileType from "../middlewares/checkFileType.js";
import requireAuth from "../middlewares/requireAuth.js";
import { body } from "express-validator";

const userApiroute = express.Router();

userApiroute.post(
  "/signup",
  checkFileType("profileImageUrl"),
  [
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long."),
    body("email")
      .isEmail()
      .withMessage("Enter a valid email.")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters."),
  ],
  checkDuplicate(["username", "email"], user),
  handleSignUp
);

userApiroute.post("/signin", handleSignIn);

userApiroute.get("/logout", requireAuth, handleLogOut);

userApiroute.patch("/reset-password", requireAuth, handelResetPassword);

userApiroute.post("/forgot-password", handleForgotPassword);

userApiroute.patch("/update-password/:userId", handleUpdatePassword);

export default userApiroute;
