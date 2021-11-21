const contactsOperation = require("../../operations");

const add = async (req, res) => {
  const result = await contactsOperation.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = add;
