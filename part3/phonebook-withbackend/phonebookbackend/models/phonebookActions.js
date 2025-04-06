// Actions used by the mongose database
const mongoose = require("mongoose");
const Phonebook = require("./phonebook");

function addDB(body) {
  const phonebook = new Phonebook({
    content: body.content,
    important: body.important || false,
  });

  phonebook.save().then((result) => {
    console.log("Person saved!");
    return result;
  });
}

async function deleteDB(id) {
  const result = await phonebook.deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    console.log("No document was deleted!");
  }
}

async function findDB() {
  return await phonebook.find({});
}

module.exports = { addDB, findDB, deleteDB };
