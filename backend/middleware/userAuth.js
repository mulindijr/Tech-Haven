import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized! Login Again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};

export default userAuth;