const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");

const mongoose = require("mongoose");
const Blog = require("../models/blog");

const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const testHelper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObject = testHelper.initialBlog.map((blog) => new Blog(blog));
  const promiseArray = blogObject.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("HTTP GET request", () => {
  test("verifies JSON format", async () => {
    await api.get("/api/blogs").expect("Content-Type", /application\/json/);
  });

  test("verifies blog post amount", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, testHelper.initialBlog.length);
  });
});

describe("HTTP POST request", () => {
  test("successfully created a new blog", async () => {
    const newBlog = {
      title: "The moon and the sky",
      author: "Rossy",
      url: "www.spaceandstuff/blog/2024/3",
      likes: 342,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, testHelper.initialBlog.length + 1);
  });
});

describe("The structure of", () => {
  test("blog id is correct", async () => {
    const response = await api.get("/api/blogs");

    response.body.forEach((blog) => {
      assert(Object.keys(blog).includes("id"));
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
