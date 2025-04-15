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
    console.log(response.body);

    assert.strictEqual(response.body.length, testHelper.initialBlog.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
