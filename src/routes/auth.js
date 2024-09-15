const { verify } = require("jsonwebtoken");
const { register, login } = require("../controllers/usersController");

const router = require("express").Router();

router.post("/register", function (req, res, next) {
  register(req, res, next);
});
router.post("/login", function (req, res, next) {
  login(req, res, next);
});
router.get("/validate-token", function (req, res, next) {
  verify();
});

module.exports = router;
