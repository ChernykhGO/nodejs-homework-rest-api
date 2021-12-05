const { User } = require("../../model");

const current = async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  res.json({
    status: "succes",
    code: 200,
    data: {
      email: currentUser.email,
      subscription: currentUser.subscription,
      avatarURL: currentUser.avatarURL,
      verificationToken: currentUser.verificationToken,
    },
  });
};

module.exports = current;
