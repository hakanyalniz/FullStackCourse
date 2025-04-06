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

async function deleteDB(payload) {
  console.log("Inside deleteDB", payload);

  const result = await Phonebook.findOneAndDelete({ name: payload });

  if (result === null) {
    console.log("No document was deleted!");
    return 0;
  }

  // Return the updated data
  return await findDB();
}

async function updateDB(payloadBody) {
  const result = await Phonebook.findOneAndUpdate(
    { name: payloadBody.name },
    { $set: { number: payloadBody.number } },
    { new: true }
  );
  return result;
}

async function findDB() {
  return await Phonebook.find({});
}

module.exports = { addDB, findDB, deleteDB, updateDB };
