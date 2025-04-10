// Creates scheme and model for database collection
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
