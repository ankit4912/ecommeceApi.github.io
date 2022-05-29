import express from "express";
const router = express.Router();

import {
  newCategory,
  findCategoryAll,
  findCategory,
  editCategory,
  removeCategory,
} from "../controller/category.controller";

router.post("/newCategory", newCategory);
router.get("/", findCategoryAll);
router.get("/:id", findCategory);
router.put("/:id", editCategory);
router.delete("/:id", removeCategory);
export default router;
