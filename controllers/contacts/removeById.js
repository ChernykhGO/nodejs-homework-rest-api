const { NotFound } = require("http-errors");
const { Contact } = require("../../model");

const removeById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findOneAndRemove({
    id,
    owner: req.user._id,
  });
  if (!result) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
  });
};

module.exports = removeById;
