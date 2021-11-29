const { Contact } = require('../../model/index')

const { NotFound } = require('http-errors')
const getById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId)
  if (!result) {
    throw new NotFound('Not found')
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = getById
