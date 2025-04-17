const logger = require("./logger");
const { findDB } = require("../models/noteActions");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

// Check if the id exists and deal with it accordingly
const verifyID = async (request, response, next) => {
  const id = request.params.id;
  const pendingNotePromise = await findDB();

  const note = pendingNotePromise.find((note) => note.id === id);

  console.log(request.params);

  // Return early
  if (!note) {
    return response.status(404).json({ error: "Note not found" });
  }

  // Attach note to request for later use
  request.note = note;
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send("404 - Route Not Found");
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  verifyID,
};
