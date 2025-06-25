const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // ambil token setelah "Bearer"

  if (!token) return res.sendStatus(401); // Token tidak ditemukan

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token tidak valid atau expired
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
