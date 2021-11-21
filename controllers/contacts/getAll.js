const contactsOperation = require("../../operations");

const getAll = async (req, res) => {
  const contacts = await contactsOperation.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
