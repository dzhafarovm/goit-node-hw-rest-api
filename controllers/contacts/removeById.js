const { NotFound } = require("http-errors");

const contactsOperation = require("../../model");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperation.removeContact(contactId);
  console.log(result);
  if (!result) {
    throw new NotFound(`Contact with id='${contactId}' not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted ",
    data: {
      result,
    },
  });
};

module.exports = removeById;
