const { User } = require("../../model");
const { BadRequest } = require("http-errors");
const { sendMail } = require("../../helpers");

const repeatVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!email) {
    throw new BadRequest("Missing required field email");
  }

  if (req.body.email) {
    const mail = {
      to: email,
      subject: "Подтверждение регистрации",
      html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}">Нажмите для подтверждения регистрации</a>`,
    };
    await sendMail(mail);
  }

  if (req.body.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  res.json({
    message: "Verification email sent",
  });
};

module.exports = repeatVerify;
