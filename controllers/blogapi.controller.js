import blog from "../models/blog.model.js";
import comment from "../models/comment.model.js";
import uploadToCloudinary from "../utils/cloudinary.util.js";

const handleAddBlog = async (req, res) => {
  try {
    let coverImageUrl;
    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype,
        "blogify/coverImages"
      );
      coverImageUrl = result.secure_url;
    }
    console.log("In controller");
    console.log(coverImageUrl);

    await blog.create({
      ...req.body,
      coverImageUrl: coverImageUrl,
      createdBy: req.user._id,
    });
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error });
  }
};

const handleAddComment = async (req, res) => {
  try {
    await comment.create({
      content: req.body.content,
      createdBy: req.user._id,
      blogId: req.params.blogId,
    });
    res.redirect(req.params.blogId);
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error });
  }
};

const handleDeleteBlog = async (req, res) => {
  try {
    await blog.findByIdAndDelete(req.params.blogId);
    res.redirect("yourblog");
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error });
  }
};

const handleEditBlog = async (req, res) => {
  try {
    await blog.findByIdAndUpdate(req.params.blogId, req.body);
    res.redirect(`/${req.params.blogId}`);
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error });
  }
};

export { handleAddComment, handleAddBlog, handleDeleteBlog, handleEditBlog };
