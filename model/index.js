const listContacts = require("./contacts/listContacts");
const getContactById = require("./contacts/getContactById");
const addContact = require("./contacts/addContact");
const updateContact = require("./contacts/updateContact");
const removeContact = require("./contacts/removeContact");

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
