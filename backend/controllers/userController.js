import userModel from "../models/userModel";

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

    } 
    catch (error) {}
}

//Route for admin login
const adminLogin = async (req, res) => {
    
}

export { loginUser, registerUser, adminLogin }