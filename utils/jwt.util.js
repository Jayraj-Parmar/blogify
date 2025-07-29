import jwt from "jsonwebtoken";

const generateToken = (user, expires = "1h") => {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expires,
  });
  return token;
};

const validationToken = (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
};

export { generateToken, validationToken };
