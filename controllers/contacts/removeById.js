const { NotFound } = require('http-errors')
const { Contact } = require('../../model')

const removeById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findOneAndRemove({
    owner: req.user._id,
    _id: contactId,
  })
  if (!result) {
    throw new NotFound('Not found')
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
  })
}

module.exports = removeById
