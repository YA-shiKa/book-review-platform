const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Incoming token:", token); 

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "bookreview_secret");

    req.user = decoded.id;
    next();
  } catch (err) {
    console.error("❌ JWT error:", err.message);
    res.status(401);
    next(new Error("Not authorized, token failed or expired"));
  }
};

module.exports = isAuthenticated;

