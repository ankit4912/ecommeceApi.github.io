import express from "express";
const router = express.Router();

import {
  newSubCategory,
  findSubCategoryAll,
  findSubCategory,
  editSubCategory,
  removeSubCategory,
} from "../controller/sub-category.controller";

router.post("/newSubCategory", newSubCategory);
router.get("/", findSubCategoryAll);
router.get("/:id", findSubCategory);
router.put("/:id", editSubCategory);
router.delete("/:id", removeSubCategory);
export default router;
