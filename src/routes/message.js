const {
  addMessage,
  getAllMessage,
} = require("../controllers/messagesController");

const router = require("express").Router();

router.post("/addmsg", function (req, res, next) {
  addMessage(req, res, next);
});

router.post("/getmsg", function (req, res, next) {
  getAllMessage(req, res, next);
});

module.exports = router;
