const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

async function connectMongooseDB() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined. Please check your .env file.");
    process.exit(1);
  }

  try {
    console.log("connecting to", MONGODB_URI);

    await mongoose.connect(MONGODB_URI);
    console.log("Mongoose connected to the database.");
  } catch (error) {
    console.log("error connection to MongoDB:", error.message);
  }
}

mongoose.set("debug", true);

module.exports = { connectMongooseDB, mongoose };
