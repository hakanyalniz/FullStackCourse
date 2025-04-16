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
    await api
      .post("/api/blogs")
      .send(testHelper.newFullBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, testHelper.initialBlog.length + 1);
  });

  test("verifies likes default to 0 if missing in POST", async () => {
    const response = await api
      .post("/api/blogs")
      .send(testHelper.newBlogWithoutLikes)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.likes, 0);
  });

  test("verifies that if title/url is missing, returns 400", async () => {
    await api
      .post("/api/blogs/")
      .send(testHelper.newBlogWithoutTitle)
      .expect(400);
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
