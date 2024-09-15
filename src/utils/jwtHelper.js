const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
};

// const verifyToken = (token) => {
//   // return jwt.verify(token, process.env.JWT_SECRET_KEY);

//   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
//     if (err) return res.sendStatus(403); // If token is invalid, return Forbidden

//     req.user = user;
//     next();
//   });
// };

module.exports = { generateToken };
