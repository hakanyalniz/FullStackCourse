const notesRouter = require("express").Router();

const { addDB, findDB, deleteDB } = require("../models/noteActions");

notesRouter.get("/", async (request, response) => {
  response.json(await findDB());
});

// Send specific notes id
notesRouter.get("/:id", (request, response) => {
  // Reuse the note from middleware
  response.json(request.note);
});

// Delete a specific notes by id
notesRouter.delete("/:id", async (request, response) => {
  // notes.filter((note) => note.id !== request.note.id);
  deleteDB(request.note.id);

  response.status(204).end();
});

// Post a specific note
notesRouter.post("/", (request, response) => {
  const body = request.body;

  // This makes the content field in the dictionary a required element
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  response.json(addDB(body));

  // const note = new Note({
  //   content: body.content,
  //   important: body.important || false,
  // });

  // note.save().then((savedNote) => {
  //   response.json(savedNote);
  // });
});

module.exports = notesRouter;
