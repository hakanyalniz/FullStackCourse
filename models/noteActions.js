// Actions used by the mongose database
const Note = require("./note");

async function addDB(body) {
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  const result = await note.save();
  return result;
}

async function deleteDB(id) {
  const result = await Note.deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    console.log("No document was deleted!");
  }
}

async function findDB() {
  return await Note.find({});
}

module.exports = { addDB, findDB, deleteDB };
