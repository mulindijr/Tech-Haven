import express from "express"
import { getUserProfile, updatePassword, updateUserProfile } from "../controllers/userProfileController.js"
import userAuth from "../middleware/userAuth.js"

const profileRouter = express.Router();

profileRouter.post("/get", userAuth, getUserProfile)
profileRouter.post("/update", userAuth, updateUserProfile)
profileRouter.post("/password", userAuth, updatePassword)

export default profileRouter;