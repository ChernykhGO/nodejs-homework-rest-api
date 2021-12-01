const { User } = require("../model");
const { Unauthorized, NotFound } = require("http-errors");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    if (req.headers.authorization === undefined) {
      throw new Unauthorized("Not authorized");
    }
    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id, "_id email");
      if (!user) {
        throw new NotFound("User not found");
      }
      if (!user.token) {
        throw new Unauthorized();
      }
      req.user = user;
      console.log(user);
      next();
    } catch (error) {
      throw new Unauthorized(error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
