const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const userRoutes = require("./user");
const messageRoutes = require("./message");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/message", messageRoutes);

module.exports = router;
