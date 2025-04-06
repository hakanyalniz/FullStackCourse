// Actions used by the mongose database
const mongoose = require("mongoose");
const Phonebook = require("./phonebook");

function addDB(body) {
  const phonebook = new Phonebook({
    name: body.name,
    number: body.number,
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
    return 0;
  }

  return 1;
}

async function updateDB(payloadBody) {
  const result = await Phonebook.findOneAndUpdate(
    { name: payloadBody.name },
    { number: payloadBody.number },
    { new: true }
  );
  return result;
}

async function findDB() {
  return await Phonebook.find({});
}

module.exports = { addDB, findDB, deleteDB, updateDB };
