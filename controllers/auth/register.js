const { Conflict } = require("http-errors");
const { User } = require("../../model");
const gravatar = require("gravatar");
const crypto = require("crypto");

const fs = require("fs/promises");
const path = require("path");
const avatarDir = path.join(__dirname, "../../public/avatars");
const { sendMail } = require("../../helpers");

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

  const verificationToken = crypto.randomUUID();

  const newUser = new User({ email, avatarURL, verificationToken });
  newUser.setPassword(password);
  await newUser.save();

  const mail = {
    to: email,
    subject: "Подтверждение регистрации",
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}">Нажмите для подтверждения регистрации</a>`,
  };
  await sendMail(mail);

  const avatarFolder = path.join(avatarDir, String(newUser._id));
  await fs.mkdir(avatarFolder);

  res.status(201).json({
    status: "succes",
    code: 201,
    message: "Register succes",
  });
};

module.exports = register;
