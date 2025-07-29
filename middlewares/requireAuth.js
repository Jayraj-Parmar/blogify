const requireAuth = (req, res, next) => {
  if (!res.locals.user) return res.redirect("/user/signin");
  next();
};

export default requireAuth;
