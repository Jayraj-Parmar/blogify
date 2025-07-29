import express from "express";
import {
  handleAddBlog,
  handleViewBlog,
  handleYourBlog,
  handleEditBlog,
} from "../controllers/blogview.controller.js";
import requireAuth from "../middlewares/requireAuth.js";

const blogViewRoute = express.Router();

blogViewRoute.get("/addblog", requireAuth, handleAddBlog);

blogViewRoute.get("/yourblog", requireAuth, handleYourBlog);

blogViewRoute.get("/editblog/:blogId", requireAuth, handleEditBlog);

blogViewRoute.get("/:id", handleViewBlog);

export default blogViewRoute;
