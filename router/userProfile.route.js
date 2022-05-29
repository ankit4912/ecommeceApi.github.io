import express from "express";
import { saveProfile } from "../controller/UserProfileController";
const router = express.Router();

router.post("/userProfile", saveProfile);

export default router;
