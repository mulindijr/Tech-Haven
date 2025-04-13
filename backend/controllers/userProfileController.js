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

// Updating User Profile
const updateUserProfile = async (req, res) => {
  try {
    const profilePic = req.file ? req.file.path : undefined;

    const userId = req.user.id;
    const { firstName, lastName, address, phone } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update basic fields
    if (firstName) user.firstName = firstName.trim();
    if (lastName) user.lastName = lastName.trim();
    if (profilePic) user.profilePic = profilePic;

    // Update address if provided
    if (address) {
      // Ensure address is an object (if sent as a string, parse it)
      const addressUpdates = typeof address === 'string' ? JSON.parse(address) : address;
      
      // Merge the existing address with new values.
      user.address = {
        ...user.address, // existing address values
        ...addressUpdates, // updated values from request
      };
    }

    if (phone) {
      user.address.phone = phone.trim();
    }

    // Save the updated user document
    const updatedUser = await user.save();

    // Remove sensitive fields before sending response
    const userResponse = updatedUser.toObject();
    delete userResponse.password;
    delete userResponse.__v;
    delete userResponse.cartData;

    res.status(200).json({ success: true, message: 'Profile updated successfully', user: userResponse, });

  } catch (error) {
    console.error('Error updating user profile', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getUserProfile, updateUserProfile };