const express = require("express");
let morgan = require("morgan");
const path = require("path");

const {
  addDB,
  findDB,
  deleteDB,
  updateDB,
} = require("./models/phonebookActions");

const app = express();

app.use("/assets", express.static(path.join(__dirname, "../assets")));

app.use(express.json());

// app.use(morgan("tiny"));

// We can create custom token to insert into morgan, which will then log them
function htmlPostBody(request, response) {
  // The request.body is JSON object, turn it into a string
  return JSON.stringify(request.body);
}
morgan.token("http-body", htmlPostBody);

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :http-body"
  )
);

// middleware for checking if a person exists or not
// adding id and person to request for later use
app.use("/api/persons/:id", async (request, response, next) => {
  const id = request.params.id;
  const personPromise = await findDB();
  const person = personPromise.find((person) => person.id === id);

  if (!person) {
    return response.status(404).send("404 - Person Not Found");
  }

  request.person = person;
  next();
});

// Check for get methods on persons, validating the user sent requests to phonebook
app.use("/api/persons", async (request, response, next) => {
  // Only catch POST method on /api/persons
  if (request.method !== "POST") return next();

  const requestBodyPerson = request.body;
  const personPromise = await findDB();

  const foundPerson = personPromise.find(
    (person) => person.name === requestBodyPerson.name
  );

  // name and number are required
  if (!requestBodyPerson.name || !requestBodyPerson.number) {
    return response.status(400).json({
      error: "missing name or number",
    });
  }

  // if a person name with that name is not found, person will be undefined and the below if block will be ignored
  if (foundPerson) {
    return response.status(400).json({
      error: "please try a different name",
    });
  }

  next();
});

// app.get("/", (request, response) => {
//   response.sendFile(path.join(__dirname, "../index.html"));
// });

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "../index.html"));
});

app.get("/info", async (request, response) => {
  const timestamp = new Date().toISOString();

  const personPromise = await findDB();
  const phonebookLength = personPromise.length;
  const html = `
  <p>Phonebook has info for ${phonebookLength} people</p>
  <p>${timestamp}</p>
  `;
  response.send(html);
});

// Get all data
app.get("/api/persons", async (request, response) => {
  const phonebook = await findDB();

  response.json(phonebook);
});

// Get specific id data
app.get("/api/persons/:id", (request, response) => {
  response.json(request.person);
});

// Delete specific id data
app.delete("/api/persons", async (request, response) => {
  const name = request.query.name;
  console.log("Inside request,", name);

  const deletePromise = await deleteDB(name);

  response.json(deletePromise);
});

// Post a specific data
app.post("/api/persons", async (request, response, next) => {
  const body = request.body;
  let person;
  try {
    person = await addDB(body);
  } catch (error) {
    next(error);
  }

  response.json(person);
});

// Update one specific data
app.put("/api/persons", async (request, response) => {
  console.log("Got a PUT request at /api/persons");
  const payloadBody = request.body;
  const result = await updateDB(payloadBody);

  response.send(result);
});

// Error handling for malformed JSON
// JSON handler internally calls next(error), so this gets called
app.use((error, request, response, next) => {
  console.log("Error name", error.name);

  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return response.status(400).send({
      error: "Invalid JSON",
      message: "Malformed JSON",
    });
  } else if (error.name === "ValidationError") {
    return response
      .status(400)
      .json({ error: "ValidationError", message: error.message });
  }

  next();
});

app.get("/*splat", (request, response) => {
  response.sendFile(path.join(__dirname, "../index.html"));
});

const PORT = process.env.PORT | 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
