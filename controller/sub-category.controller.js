import subCategory from "../models/sub-category.model";
import Category from "../models/category.model";
import mongoose from "mongoose";

//** Create Sub-category */

export const newSubCategory = async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  let subcategoryAdd = new subCategory({
    name: req.body.name,
    category: req.body.category,
  });

  subcategoryAdd = await subcategoryAdd.save();

  if (!subcategoryAdd)
    return res.status(500).send("The product cannot be created");

  res.send(subcategoryAdd);
};

//** Read Sub-category */

export const findSubCategoryAll = async (req, res) => {
  const subcategoryFind = await subCategory.find().populate("category");

  if (!subcategoryFind) {
    res.status(500).json({
      Error: err,
      status: false,
    });
  }
  res.send(subcategoryFind);
};

export const findSubCategory = async (req, res) => {
  const subcategoryFind = await subCategory
    .findById(req.params.id)
    .populate("category");

  if (!subcategoryFind) {
    res.status(500).json({
      Error: err,
      status: false,
    });
  }
  res.send(subcategoryFind);
};

//** Update Sub-category */

export const editSubCategory = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid user Id");
  }

  const subCategoryEdit = await subCategory.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      category: req.body.category,
    },
    {
      new: true,
    }
  );
  if (!subCategoryEdit)
    return res.status(500).send("the user cannot be updated!");
  res.send(subCategoryEdit);
};

//** Delete Sub-category */

export const removeSubCategory = async (req, res) => {
  try {
    const _id = req.params.id;
    const subCategoryEdit = await subCategory.findByIdAndDelete(_id, req.body);
    res.send(subCategoryEdit);
  } catch (err) {
    res.status(404).send(err);
  }
};
