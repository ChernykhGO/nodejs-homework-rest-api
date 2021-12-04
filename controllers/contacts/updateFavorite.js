const { NotFound } = require("http-errors");
const { Contact } = require("../../model");

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findOneAndUpdate(
    {
      id,
      owner: req.user._id,
    },
    { favorite },
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
module.exports = updateFavorite;
