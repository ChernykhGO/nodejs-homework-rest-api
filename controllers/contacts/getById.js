const { Contact } = require("../../model/index");

const { NotFound } = require("http-errors");
const getById = async (req, res, next) => {
  console.log(req.params);
  const { id } = req.params;
  const result = await Contact.findOne({
    id,
    owner: req.user._id,
  });
  if (!result) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getById;
