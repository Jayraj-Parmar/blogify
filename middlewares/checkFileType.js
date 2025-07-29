import multer from "multer";
const checkFileType = (field) => {
  return (req, res, next) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/svg+xml",
      "image/webp",
    ];

    const upload = multer({
      storage: multer.memoryStorage(),
      limits: { fileSize: 2 * 1024 * 1024 },
    });

    upload.single(field)(req, res, (err) => {
      if (!req.file && field === "profileImageUrl") return next();
      if (err || !allowedTypes.includes(req.file?.mimetype)) {
        const message = err?.message || "Invalid file type.";
        const fallbackData =
          field === "profileImageUrl"
            ? {
                message,
                username: req.body?.username,
                email: req.body?.email,
                password: req.body?.password,
              }
            : {
                message,
                title: req.body?.title,
                body: req.body?.body,
              };
        return res.render(
          field === "profileImageUrl" ? "signup" : "addblog",
          fallbackData
        );
      }
      next();
    });
  };
};

export default checkFileType;
