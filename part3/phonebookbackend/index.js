const express = require("express");
const app = express();

app.use(express.json());

let phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  return String(Math.floor(Math.random() * 1000));
};

// middleware for checking if a person exists or not
// adding id and person to request for later use
app.use("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  const person = phonebook.find((person) => person.id === id);

  if (!person) {
    return response.status(404).send("404 - Person Not Found");
  }

  request.person = person;
  next();
});

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.get("/info", (request, response) => {
  const timestamp = new Date().toISOString();

  const phonebookLength = phonebook.length;
  const html = `
  <p>Phonebook has info for ${phonebookLength} people</p>
  <p>${timestamp}</p>
  `;
  response.send(html);
});

app.get("/api/persons", (request, response) => {
  response.json(phonebook);
});

app.get("/api/persons/:id", (request, response) => {
  response.json(request.person);
});

app.delete("/api/persons/:id", (request, response) => {
  phonebook = phonebook.filter((person) => person.id !== request.person.id);

  response.json(phonebook);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  // name and number are required
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "missing name or number",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  phonebook = phonebook.concat(person);
  response.json(phonebook);
});

// Catch all route for error handling
app.use((request, response, next) => {
  response.status(404).send("404 - Route Not Found");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
