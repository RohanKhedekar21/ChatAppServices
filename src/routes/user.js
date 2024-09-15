const { setAvatar, getAllUsers } = require("../controllers/usersController");

const router = require("express").Router();

router.post("/setAvatar/:id", function (req, res, next) {
  setAvatar(req, res, next);
});
router.get("/allUsers/:id", function (req, res, next) {
  getAllUsers(req, res, next);
});

module.exports = router;
