const { NotFound } = require("http-errors");

const contactsOperation = require("../../operations");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperation.getContactById(contactId);
  if (!result) {
    throw new NotFound(`Contact with id='${contactId}' not found`);
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
