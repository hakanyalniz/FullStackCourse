const notesRouter = require("express").Router();

const { addDB, findDB, deleteDB } = require("./models/mongo");

notesRouter.get("/api/notes", async (request, response) => {
  console.log("Inside app.get,", await findDB());

  response.json(await findDB());
});

// Send specific notes id
notesRouter.get("/api/notes/:id", (request, response) => {
  // Reuse the note from middleware
  response.json(request.note);
});

// Delete a specific notes by id
notesRouter.delete("/api/notes/:id", async (request, response) => {
  // notes.filter((note) => note.id !== request.note.id);
  deleteDB(request.note.id);

  response.status(204).end();
});

// Post a specific note
notesRouter.post("/api/notes", (request, response) => {
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
