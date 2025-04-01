const express = require("express");
const app = express();

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

const generateId = (arrayDict) => {
  const maxID =
    arrayDict.length > 0 ? Math.max(...arrayDict.map((n) => Number(n.id))) : 0;
  return String(maxID + 1);
};

// We receive JSON string, so convert it into JSON object to attach it to request body
app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

// Check if the id exists and deal with it accordingly
app.use("/api/notes/:id", (request, response, next) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);

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
app.delete("/api/notes/:id", (request, response) => {
  notes = notes.filter((note) => note.id !== request.note.id);
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

  // We use the ones we want and if the user happened to send something we did not want
  // we do not process it
  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(notes),
  };

  notes = notes.concat(note);

  response.json(note);
});

// Catch-all route for unfound routes (404)
app.use((request, response, next) => {
  response.status(404).send("404 - Route Not Found");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
