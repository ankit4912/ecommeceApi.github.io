import express from "express";
const app = express();
app.use(express.json());

import mongoose from "mongoose";

import userRoutes from "./router/user.route";
import productRoutes from "./router/product.route";
import categoryRoutes from "./router/category.route";
import subcategoryRoutes from "./router/sub-category.route";
import UserProfileRoutes from "./router/userProfile.route";

import cors from "cors";
import cookieParser from "cookie-parser";

app.get("/", function (req, res) {
  res.send("Hello World!");
});
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);
app.use("/subcategory", subcategoryRoutes);
app.use("/userPro", UserProfileRoutes);

mongoose
  .connect("mongodb://localhost:27017/e_commerce")
  .then(() => {
    console.log("mongodb started");
  })
  .catch(() => {
    console.log("mongodb connection error");
  });

app.listen(5000, function () {
  console.log("Example app listening on port 5000!");
});
