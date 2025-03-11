import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {

    const {token} = req.headers;
    if (!token) {
        return res.json({success: false, message: "Not Authorized! Login Again"});
    }

    try {

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: "Invalid or expired token" });        
    }
}

export default userAuth;