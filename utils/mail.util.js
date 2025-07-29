import transporter from "../config/mail.config.js";

const sendWelcomeEmail = async (user) => {
  const mailOptions = {
    from: '"Blogify" <thirdparty6262@gmail.com>',
    to: user.email,
    subject: "Welcome to Blogify! 🎉",
    html: `<h2>Hello ${user.username}!</h2><p>We're excited to have you onboard. Start sharing your voice with the world.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    alert("Welcome email is not sent");
  }
};

const sendEmailForForgotPassword = async (user, token) => {
  const link = `http://localhost:8000/user/forgot-password/${token}`;
  const mailOptions = {
    from: '"Blogify" <thirdparty6262@gmail.com>',
    to: user.email,
    subject: "Forgot Password of Blogify account",
    html: `<h2>Hello ${user.username}!</h2><p>Click the link to reset your password:<a href="${link}" title="click to reset password">Reset Password</a></p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Mail error:", error.message);
    return false;
  }
};

export { sendWelcomeEmail, sendEmailForForgotPassword };
