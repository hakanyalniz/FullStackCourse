const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");

const mongoose = require("mongoose");
const Blog = require("../models/blog");

const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const initialBlog = [
  {
    title: "How to tame your dragon",
    author: "Taylor",
    url: "www.tamingDragons.com/post01",
    likes: 1002,
  },
  {
    title: "The chilling tale of snowman",
    author: "Drake",
    url: "www.allthingssnow.com/snowman/01/chill",
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlog[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlog[1]);
  await blogObject.save();
});

describe("HTTP GET request", () => {
  test("verifies JSON format", async () => {
    await api.get("/api/blogs").expect("Content-Type", /application\/json/);
  });

  test("verifies blog post amount", async () => {
    const response = await api.get("/api/blogs");
    console.log(response.body);

    assert.strictEqual(response.body.length, initialBlog.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
