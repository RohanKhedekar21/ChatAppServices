const {
  register,
  login,
  setAvatar,
  getAllUsers,
} = require("../controllers/usersController");

const router = require("express").Router();

router.post("/register", function (req, res, next) {
  register(req, res, next);
});
router.post("/login", function (req, res, next) {
  login(req, res, next);
});
router.post("/setAvatar/:id", function (req, res, next) {
  setAvatar(req, res, next);
});
router.get("/allUsers/:id", function (req, res, next) {
  getAllUsers(req, res, next);
});

module.exports = router;
