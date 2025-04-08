// For exercise 3.12

const mongoose = require("mongoose");

let mongoFlag = "default";
let peopleName;
let peopleNumber;
let password;

if (process.argv.length < 3) {
  console.log(
    `Please enter: node mango.js <password> <person-name> <person-number>
    
    <person-name> and <person-number> are not required`
  );
  process.exit(1);
}

if (process.argv.length === 3) {
  mongoFlag = "find";
} else if (process.argv.length === 5) {
  mongoFlag = "add";
  peopleName = process.argv[3];
  peopleNumber = process.argv[4];
}

password = process.argv[2];

const url = `mongodb+srv://hakanyalniz:${password}@cluster0.s5npqf1.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", noteSchema);

console.log(mongoFlag);

if (mongoFlag === "add") {
  const people = new Person({
    name: peopleName,
    number: peopleNumber,
  });
  people.save().then((result) => {
    console.log(`Added ${peopleName}'s number ${peopleNumber} to phonebook`);
    mongoose.connection.close();
  });
} else if (mongoFlag === "find") {
  Person.find({}).then((result) => {
    console.log("Phonebook:");

    result.forEach((people) => {
      console.log(people.name, people.number);
    });

    mongoose.connection.close();
  });
}
