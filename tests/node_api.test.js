const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");

const mongoose = require("mongoose");
const supertest = require("supertest");
const testHelper = require("./test_helper");

const app = require("../app");
const Note = require("../models/note");
const api = supertest(app);

beforeEach(async () => {
  await Note.deleteMany({});

  const noteObjects = testHelper.initialNotes.map((note) => new Note(note));
  const notePromise = noteObjects.map((note) => note.save());

  await Promise.all(notePromise);
});

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two notes", async () => {
  const notesAtEnd = await testHelper.notesInDb();

  assert.strictEqual(notesAtEnd.length, testHelper.initialNotes.length);
});

test("the first note is about HTTP methods", async () => {
  const notesAtEnd = await testHelper.notesInDb();
  const contents = notesAtEnd.map((e) => e.content);

  assert(contents.includes("HTML is easy"), true);
});

test("a valid note can be added", async () => {
  const newNote = {
    content: "async/await simplifies making async calls",
    important: true,
  };

  await api
    .post("/api/notes")
    .send(newNote)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const notesAtEnd = await testHelper.notesInDb();
  const contents = notesAtEnd.map((n) => n.content);

  assert.strictEqual(notesAtEnd.length, testHelper.initialNotes.length + 1);
  assert(contents.includes("async/await simplifies making async calls"));
});

test("note without content is not added", async () => {
  const newNote = {
    important: true,
  };

  await api.post("/api/notes").send(newNote).expect(400);

  const notesAtEnd = await testHelper.notesInDb();

  assert.strictEqual(notesAtEnd.length, testHelper.initialNotes.length);
});

test("a specific note can be viewed", async () => {
  const notesAtStart = await testHelper.notesInDb();
  const noteToView = notesAtStart[0];

  const fetchedNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.deepStrictEqual(fetchedNote.body, noteToView);
});

test("a note can be deleted", async () => {
  const notesAtStart = await testHelper.notesInDb();
  const noteToDelete = notesAtStart[0];

  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

  const notesAtEnd = await testHelper.notesInDb();

  const contents = notesAtEnd.map((r) => r.content);

  assert(!contents.includes(noteToDelete.content));
  assert.strictEqual(notesAtEnd.length, testHelper.initialNotes.length - 1);
});

after(async () => {
  await mongoose.connection.close();
});
