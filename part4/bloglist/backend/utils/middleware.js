const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:", request.originalUrl);
  logger.info("Body:  ", request.body);
  logger.info("---");

  next();
};

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.log(error);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
