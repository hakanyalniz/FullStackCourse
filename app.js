const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middlware");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(express.static("public"));
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "index.html"));
});

app.use("/api/notes/:id", middleware.verifyID);
app.use("/api/login", loginRouter);
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
