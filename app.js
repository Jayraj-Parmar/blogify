import express from "express";
import connectDb from "./config/db.config.js";
import dotenv from "dotenv";
import userViewRoute from "./routes/userview.route.js";
import userApiroute from "./routes/userapi.route.js";
import cookieParser from "cookie-parser";
import checkForAuthenticationCookie from "./middlewares/authentication.js";
import methodOverride from "method-override";
import blogViewRoute from "./routes/blogview.route.js";
import blogApiRoute from "./routes/blogapi.route.js";
import { handleViewAllBlogsAtHome } from "./controllers/blogview.controller.js";

const app = express();

// config
dotenv.config();
app.set("view engine", "ejs");
app.set("views", "./views/pages");

//Mieddleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(methodOverride("_method"));

// MongoDB Connection
connectDb(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running at PORT: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDB connection error: ${error.message}`);
  });

// home page route
app.get("/", handleViewAllBlogsAtHome);

// Routes
app.use("/user", userViewRoute);
app.use("/user", userApiroute);
app.use(blogViewRoute);
app.use(blogApiRoute);
