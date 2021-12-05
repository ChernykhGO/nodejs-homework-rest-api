const { Conflict } = require("http-errors");
const { User } = require("../../model");
const gravatar = require("gravatar");

const fs = require("fs/promises");
const path = require("path");
const avatarDir = path.join(__dirname, "../../public/avatars");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("User allready exist");
  }

  const avatarURL = gravatar.url(email, {
    d: "mp",
    protocol: "https",
  });

  const newUser = new User({ email, avatarURL });
  newUser.setPassword(password);
  await newUser.save();

  const avatarFolder = path.join(avatarDir, String(newUser._id));
  await fs.mkdir(avatarFolder);

  res.status(201).json({
    status: "succes",
    code: 201,
    message: "Register succes",
  });
};

module.exports = register;
