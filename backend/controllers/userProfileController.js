import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';

// Getting User Profile
const getUserProfile = async (req, res) => {
  try {

    const userId = req.user.id;
    const user = await userModel.findById(userId).select('-password -cartData -__v');

    if (!user) {
      return res.status(404).json ({success: false, message: 'User not found'})
    }
    
    res.status(200).json({success: true, user})
      
  } catch (error) {
    console.error('Error fetching user profile', error)
    res.status(500).json({success: false, message: error.message})        
  }
}

export { getUserProfile };