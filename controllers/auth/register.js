const { Conflict } = require('http-errors')
// const bcrypt = require("bcryptjs");
const { User } = require('../../model')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('User allready exist')
  }

  const newUser = new User({ email })
  newUser.setPassword(password)
  await newUser.save()
  //   const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  //   const newUser = await User.create({ email, password: hashPassword });
  res.status(201).json({
    status: 'succes',
    code: 201,
    message: 'Register succes',
  })
}

module.exports = register
