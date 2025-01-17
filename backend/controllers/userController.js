import userModel from "../models/userModel";
import validator from "validator";

//Route for user login
const loginUser = async (req, res) => {

}

//Route for user registration
const registerUser = async (req, res) => {

    try {

        const { name, email, password} = req.body;

        //Check if user already exists
        const userExists = await userModel.findOne({email});
        if (userExists) {
            return res.json({success:false, message: "User already exists"});
        }

        //Validating email and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message: "Invalid email"})
        }

        if (password.length < 8) {
            return res.json({success:false, message: "Password must be at least 8 characters long"})
        }

    } 
    catch (error) {}
}

//Route for admin login
const adminLogin = async (req, res) => {
    
}

export { loginUser, registerUser, adminLogin }