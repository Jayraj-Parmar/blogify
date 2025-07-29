import express from "express";
import {
  handleAddBlog,
  handleAddComment,
  handleDeleteBlog,
  handleEditBlog,
} from "../controllers/blogapi.controller.js";
import checkFileType from "../middlewares/checkFileType.js";
import requireAuth from "../middlewares/requireAuth.js";

const blogApiRoute = express.Router();

blogApiRoute.post("/addblog", checkFileType("coverImageUrl"), handleAddBlog);

blogApiRoute.post("/:blogId", requireAuth, handleAddComment);

blogApiRoute.delete("/:blogId", requireAuth, handleDeleteBlog);

blogApiRoute.patch("/editblog/:blogId", requireAuth, handleEditBlog);

export default blogApiRoute;
