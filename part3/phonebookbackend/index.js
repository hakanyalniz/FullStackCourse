const express = require("express");
const app = express();

app.use(express.json());

const phonebook = [
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
