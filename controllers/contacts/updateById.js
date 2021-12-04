const { NotFound } = require("http-errors");
const { Contact } = require("../../model");

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findOneAndUpdate(
    {
      id,
      owner: req.user._id,
    },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw new NotFound(`Product with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = updateById;
