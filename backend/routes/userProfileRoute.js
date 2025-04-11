import express from "express"
import { getUserProfile, updatePassword, updateUserProfile } from "../controllers/userProfileController.js"
import userAuth from "../middleware/userAuth.js"

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, getUserProfile)
profileRouter.put("/profile", userAuth, updateUserProfile)
profileRouter.put("/profile/password", userAuth, updatePassword)

export default profileRouter;