const User = require("../models/users");
const jwt = require("jsonwebtoken");

const auth = (requiredRoles = []) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(400)
        .json({ status: false, message: "Authentication Invalid" });
    }

    const token = authHeader.split(" ")[1];
    console.log(token);
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Token not found" });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(payload.userId);

      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: "User not found" });
      }
      console.log(user._id, user.role);
      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        return res.status(403).json({
          status: false,
          message: "Access forbidden: Insufficient permissions",
        });
      }

      req.user = {
        userId: user._id,
        role: user.role,
      };

      next();
    } catch (error) {
      return res
        .status(400)
        .json({ status: false, message: "Authentication Invalid" });
    }
  };
};

module.exports = auth;
