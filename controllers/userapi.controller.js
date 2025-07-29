import user from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.util.js";
import {
  sendEmailForForgotPassword,
  sendWelcomeEmail,
} from "../utils/mail.util.js";
import uploadToCloudinary from "../utils/cloudinary.util.js";
import { validationResult } from "express-validator";
const handleSignUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("signup", {
        message: errors.array()[0].msg,
        username: req.body?.username,
        email: req.body?.email,
        password: req.body?.password,
      });
    }
    let profileImageUrl;
    if (req.file) {
      const result = await uploadToCloudinary(
        req.file?.buffer,
        req.file?.mimetype,
        "blogify/profileImages"
      );
      profileImageUrl = result.secure_url;
    }

    const newUser = await user.create({
      ...req.body,
      profileImageUrl: profileImageUrl,
    });
    await sendWelcomeEmail(newUser);
    res.redirect("signin");
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

const handleSignIn = async (req, res) => {
  try {
    const { usernameoremail, password } = req.body;
    const userData = await user.findOne({
      $or: [{ username: usernameoremail }, { email: usernameoremail }],
    });
    if (!userData) {
      return res.render("signin", {
        error: "User does not exist",
        usernameoremail,
      });
    }
    const isMatch = await bcrypt.compare(password, userData["password"]);
    if (!isMatch && userData) {
      return res.render("signin", {
        error: "Incorrect Password !",
        usernameoremail,
      });
    }
    const token = generateToken(userData);
    res.cookie("token", token, { maxAge: 1000 * 60 * 60 }).redirect("/");
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

const handleLogOut = (req, res) => {
  try {
    res.clearCookie("token").redirect("/");
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

const handelResetPassword = async (req, res) => {
  try {
    const { currentpassword, newpassword, confirmnewpassword } = req.body;
    const currentUser = res.locals.user["_id"];
    const userData = await user.findOne({ _id: currentUser });
    const isMatch = await bcrypt.compare(currentpassword, userData["password"]);
    if (!isMatch) {
      return res.render("resetpassword", {
        message: "Incorrect User Password!",
      });
    }
    if (newpassword !== confirmnewpassword) {
      return res.render("resetpassword", {
        currentpassword,
        newpassword,
        confirmnewpassword,
        message: "New password and confirm password are not match",
      });
    }
    userData.password = newpassword;
    await userData.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

const handleForgotPassword = async (req, res) => {
  try {
    const { usernameoremail } = req.body;
    const userData = await user.findOne({
      $or: [{ username: usernameoremail }, { email: usernameoremail }],
    });
    if (!userData)
      return res.render("forgotpassword", {
        error: "User does not exist",
        usernameoremail,
      });
    const forgot_token = generateToken(userData, "5m");
    const emailSent = await sendEmailForForgotPassword(userData, forgot_token);
    if (!emailSent) {
      return res.render("forgotpassword", {
        error: "Email could not be sent. Please try again later.",
        usernameoremail,
      });
    }
    res.send("<p>Link is sent to your registred email.<p>");
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

const handleUpdatePassword = async (req, res) => {
  try {
    const { newpassword, confirmnewpassword } = req.body;
    const { userId } = req.params;
    if (newpassword !== confirmnewpassword) {
      return res.render("newpassword", {
        newpassword,
        confirmnewpassword,
        message: "New password and confirm password are not match",
      });
    }
    const userData = await user.findById(userId);
    userData.password = newpassword;
    await userData.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

export {
  handleSignUp,
  handleSignIn,
  handleLogOut,
  handelResetPassword,
  handleForgotPassword,
  handleUpdatePassword,
};
