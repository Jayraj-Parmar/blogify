import express from "express";
import {
  handleSignUp,
  handleSignIn,
  handleResetPassword,
  handleForgotPassword,
  handleNewPassword,
} from "../controllers/userview.controller.js";
import requireAuth from "../middlewares/requireAuth.js";

const userViewRoute = express.Router();

userViewRoute.get("/signup", handleSignUp);
userViewRoute.get("/signin", handleSignIn);
userViewRoute.get("/reset-password", requireAuth, handleResetPassword);
userViewRoute.get("/forgot-password", handleForgotPassword);
userViewRoute.get("/forgot-password/:forgot_token", handleNewPassword);

export default userViewRoute;
