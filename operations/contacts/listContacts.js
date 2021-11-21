const fs = require("fs/promises");

const contactsPath = require("./contactsPath");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = await JSON.parse(data);
  return contacts;
};

module.exports = listContacts;
