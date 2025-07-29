import { validationToken } from "../utils/jwt.util.js";

const checkForAuthenticationCookie = (cookieName) => {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }
    try {
      const userPayload = validationToken(tokenCookieValue);
      req.user = userPayload;
      res.locals.user = userPayload;
    } catch (error) {}
    return next();
  };
};

export default checkForAuthenticationCookie;
