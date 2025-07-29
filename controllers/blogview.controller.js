import blog from "../models/blog.model.js";
import comment from "../models/comment.model.js";

const handleAddBlog = async (req, res) => {
  try {
    res.render("addblog");
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

const handleViewAllBlogsAtHome = async (req, res) => {
  try {
    const allBlogs = await blog.find({});
    res.render("home", { allBlogs });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

const handleViewBlog = async (req, res) => {
  try {
    const fetchBlog = await blog.findById(req.params.id).populate("createdBy");
    const fetchComments = await comment
      .find({ blogId: req.params.id })
      .populate("createdBy");
    res.render("viewblog", { fetchBlog, fetchComments });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

const handleYourBlog = async (req, res) => {
  try {
    const fetchBlogsByUser = await blog.find({ createdBy: req.user._id });
    res.render("yourblog", { fetchBlogsByUser });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

const handleEditBlog = async (req, res) => {
  try {
    const { title, body, _id } = await blog.findById(req.params.blogId);
    res.render("editblog", { title, body, _id });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error });
  }
};

export {
  handleAddBlog,
  handleViewAllBlogsAtHome,
  handleViewBlog,
  handleYourBlog,
  handleEditBlog,
};
