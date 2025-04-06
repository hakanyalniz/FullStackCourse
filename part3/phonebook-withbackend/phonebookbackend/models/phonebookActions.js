// Actions used by the mongose database
const mongoose = require("mongoose");
const Phonebook = require("./phonebook");

function addDB(body) {
  const phonebook = new Phonebook({
    name: String,
    number: Number,
  });

  phonebook.save().then((result) => {
    console.log("Person saved!");
    return result;
  });
}

async function deleteDB(id) {
  const result = await Phonebook.deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    console.log("No document was deleted!");
  }
}

async function findDB() {
  return await Phonebook.find({});
}

module.exports = { addDB, findDB, deleteDB };
