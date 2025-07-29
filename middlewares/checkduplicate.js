const checkDuplicate = function (fields, model) {
  return async (req, res, next) => {
    try {
      for (const field of fields) {
        const exist = await model.findOne({ [field]: req.body[field] });
        if (!exist) continue;
        const message = `${field.toUpperCase()}: ${req.body[field]} is already exist `;
        return res.render("signup", { message });
      }
      next();
    } catch (error) {
      res.send(500).json({ error: "Server error", message: error.message });
    }
  };
}; 

export default checkDuplicate;
