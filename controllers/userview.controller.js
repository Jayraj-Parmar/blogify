import { validationToken } from "../utils/jwt.util.js";

const handleSignUp = async (req, res) => {
  try {
    res.render("signup");
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

const handleSignIn = async (req, res) => {
  try {
    res.render("signin");
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

const handleResetPassword = async (req, res) => {
  try {
    return res.render("resetpassword");
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

const handleForgotPassword = async (req, res) => {
  try {
    res.render("forgotpassword");
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

const handleNewPassword = async (req, res) => {
  try {
    const forgot_token = req.params.forgot_token;
    try {
      const userPayload = validationToken(forgot_token);
      res.render("newpassword", { userPayload });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.render("forgotpassword", {
          error: "Token expired. Please request a new reset link.",
        });
      }
      return res.render("forgotpassword", {
        error,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

export {
  handleSignUp,
  handleSignIn,
  handleResetPassword,
  handleForgotPassword,
  handleNewPassword,
};
