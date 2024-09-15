const User = require("../model/userModel");
const brcypt = require("bcrypt");
const { generateToken } = require("../utils/jwtHelper");
const { setupSocket } = require("../config/socketSetup");

// Register New User
module.exports.register = async (req, res, next) => {
  console.info("Service Register call");
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({ username });

    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }

    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }

    const hashedPassword = await brcypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;

    // Generate Token
    const token = generateToken(user);

    return res.json({ status: true, user, token });
  } catch (e) {
    console.info("Error in service Register", e);
    next(e);
  }
};

// Login User
module.exports.login = async (req, res, next) => {
  console.info("Service Login call");
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    const isPasswordValid = await brcypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }

    delete user.password;

    // Generate Token
    const token = generateToken(user);

    return res.json({ status: true, user, token });
  } catch (e) {
    console.info("Error in service login", e);
    next(e);
  }
};

// Set Profile Avatar
module.exports.setAvatar = async (req, res, next) => {
  console.info("Service setAvatar call");
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );

    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (e) {
    console.info("Error in service setAvatar", e);
    next(e);
  }
};

// Get All Users
module.exports.getAllUsers = async (req, res, next) => {
  console.info("Service getAllUsers call");
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (e) {
    console.info("Error in service getAllUsers", e);
    next(e);
  }
};
