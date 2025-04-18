const notesRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { addDB, findDB, deleteDB } = require("../models/noteActions");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

notesRouter.get("/", async (request, response, next) => {
  try {
    response.json(await findDB());
  } catch (exception) {
    next(exception);
  }
});

// Send specific notes id
notesRouter.get("/:id", (request, response, next) => {
  // Reuse the note from middleware
  try {
    response.json(request.note);
  } catch (exception) {
    next(exception);
  }
});

// Delete a specific notes by id
notesRouter.delete("/:id", async (request, response, next) => {
  // notes.filter((note) => note.id !== request.note.id);
  deleteDB(request.note.id);

  try {
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

// Post a specific note
notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  // This makes the content field in the dictionary a required element
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  try {
    response.status(201).json(addDB(body, user));
  } catch (exception) {
    next(exception);
  }
});

module.exports = notesRouter;
