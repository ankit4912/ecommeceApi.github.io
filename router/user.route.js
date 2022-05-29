import express from "express";
const router = express.Router();

import {
  newUser,
  loginUser,
  usersAll,
  findUser,
  editUser,
  deleteUser,
} from "../controller/user.controller";

router.post("/signup", newUser);
router.post("/login", loginUser);
router.get("/", usersAll);
router.get("/:id", findUser);
router.put("/:id", editUser);
router.delete("/removeProfile", deleteUser);
export default router;
