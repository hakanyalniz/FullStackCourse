const express = require("express");
const path = require("path");
const Note = require("./models/note");
const { addDB, findDB, deleteDB } = require("./models/mongo");

const app = express();
const cors = require("cors");

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// We receive JSON string, so convert it into JSON object to attach it to request body
app.use(express.json());
app.use(cors());
app.use(express.static("public")); // Serve files from 'public' folder

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/notes", async (request, response) => {
  console.log("Inside app.get,", await findDB());

  response.json(await findDB());
});

// Check if the id exists and deal with it accordingly
app.use("/api/notes/:id", async (request, response, next) => {
  const id = request.params.id;
  const pendingNotePromise = await findDB();
  const note = pendingNotePromise.find((note) => note.id === id);

  // Return early
  if (!note) {
    return response.status(404).json({ error: "Note not found" });
  }

  // Attach note to request for later use
  request.note = note;
  next();
});

// Send specific notes id
app.get("/api/notes/:id", (request, response) => {
  // Reuse the note from middleware
  response.json(request.note);
});

// Delete a specific notes by id
app.delete("/api/notes/:id", async (request, response) => {
  // notes.filter((note) => note.id !== request.note.id);
  deleteDB(request.note.id);

  response.status(204).end();
});

// Post a specific note
app.post("/api/notes", (request, response) => {
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

// Catch-all route for unfound routes (404)
app.use((request, response, next) => {
  response.status(404).send("404 - Route Not Found");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
