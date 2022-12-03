const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  const list = await fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err.message));
  return list;
}

async function getContactById(contactId) {
  const contact = await fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((data) => data.find((el) => el.id === contactId))

    .catch((err) => console.log(err.message));

  if (!contact) {
    return "There is now requested id";
  }
  return contact;
}

async function removeContact(contactId) {
  const contact = await fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((data) => {
      if (data.find((el) => el.id === contactId)) {
        return data.filter((el) => el.id !== contactId);
      }
      return null;
    })
    .catch((err) => console.log(err.message));

  if (!contact) {
    return "There is now requested id";
  }
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return contact;
}

async function addContact(name, email, phone) {
  const newContact = { name, email, phone, id: nanoid() };
  const contacts = await fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err.message));

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

// console.log(listContacts());
// getContactById("2");
// removeContact("2");
// /console.log(addContact("Lera", "Lera@gmail.com", "095095"));
