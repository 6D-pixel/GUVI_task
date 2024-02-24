const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ msg: "missing auth header" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "err" });
  }
}

module.exports = { authMiddleware };
