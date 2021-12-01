const { NotFound } = require("http-errors");
const { Contact } = require("../../model");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    {
      owner: req.user._id,
      _id: contactId,
    },
    { favorite },
    {
      new: true,
    }
  );
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`);
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
