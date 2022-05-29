import express from "express";
import {
  productNew,
  findProductAll,
  findProduct,
  editProduct,
  removeProduct,
  countProduct,
  countFeatured,
  findProductBy,
  ProductFindBySubCategory,
} from "../controller/product.controller";

const router = express.Router();

router.post("/newProduct", productNew);
router.get("/", findProductAll);
router.get("/:id", findProduct);
router.put("/:id", editProduct);
router.delete("/:id", removeProduct);
// router.post("/countProduct", countProduct);
router.get("/countProduct/", countProduct);

router.get("/count/countFeatured", countFeatured);
// router.post("/findProductBy", findProductBy);
router.get("/findProductBy/:id", findProductBy);
router.post("/sub-category/:id", ProductFindBySubCategory);

export default router;
