
const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication required. Please log in.",
    });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Authentication token is missing.",
    });
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret || secret.length < 32) {
      console.error("JWT_SECRET is missing or too short.");

      return res.status(500).json({
        message: "Server authentication configuration error.",
      });
    }

    const decoded = jwt.verify(token, secret);

    if (decoded.role !== "ADMIN" || !decoded.userId) {
      return res.status(403).json({
        message: "Access denied. Administrators only.",
      });
    }

    req.admin = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({
        message: "Invalid or expired access token. Please log in again.",
      });
    }

    console.error("Admin authentication error:", error);

    return res.status(500).json({
      message: "Unable to authenticate administrator.",
    });
  }
}

module.exports = adminAuth;
