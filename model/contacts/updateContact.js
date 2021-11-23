const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

const updateContact = async (contactId, name, email, phone) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id: contactId, name, email, phone };
  await updateContacts(contacts);
  return contacts[idx];
};

module.exports = updateContact;
