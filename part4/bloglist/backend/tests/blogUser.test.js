const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const testHelper = require("./test_helper");

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await testHelper.usersInDb();

    const newUser = {
      username: "Roze",
      name: "Rosalaen",
      password: "sekret",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await testHelper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with invalid short username", async () => {
    const newShortUser = {
      username: "Ro",
      name: "Rosalaen",
      password: "sekret",
    };

    await api.post("/api/users").send(newShortUser).expect(400);
  });

  test("creation fails with invalid none existent password", async () => {
    const newShortUser = {
      username: "Roze",
    };

    await api.post("/api/users").send(newShortUser).expect(400);
  });

  test("creation fails with invalid same username", async () => {
    const newShortUser = {
      username: "root",
      password: "newsekret",
    };

    await api.post("/api/users").send(newShortUser).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
