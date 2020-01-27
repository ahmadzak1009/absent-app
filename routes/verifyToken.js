const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("access denied");

  try {
    const verified = jwt.verify(token.slice(7), process.env.JWT_SECRET_TOKEN);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("invalid token");
  }
};
