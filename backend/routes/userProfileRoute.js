import express from "express"
import { getUserProfile, updatePassword, updateUserProfile } from "../controllers/userProfileController.js"
import userAuth from "../middleware/userAuth.js"
import upload from "../middleware/multer.js";

const profileRouter = express.Router();

profileRouter.post("/get", userAuth, getUserProfile)
profileRouter.post("/update", userAuth, upload.single("profilePic"), updateUserProfile)
profileRouter.post("/password", userAuth, updatePassword)

export default profileRouter;