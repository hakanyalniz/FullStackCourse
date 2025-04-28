const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const testHelper = require("./test_helper");

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({
    username: "root",
    passwordHash,
    _id: new ObjectId("507f1f77bcf86cd799439011"),
  });

  await user.save();

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
      .set("Authorization", `Bearer ${await testHelper.loggedInUser()}`)
      .send(testHelper.newFullBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, testHelper.initialBlog.length + 1);
  });

  test("with missing token while creating blog is working as expected", async () => {
    await api
      .post("/api/blogs")
      .send(testHelper.newFullBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });

  test("verifies likes default to 0 if missing in POST", async () => {
    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${await testHelper.loggedInUser()}`)
      .send(testHelper.newBlogWithoutLikes)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.likes, 0);
  });

  test("verifies that if title/url is missing, returns 400", async () => {
    await api
      .post("/api/blogs/")
      .set("Authorization", `Bearer ${await testHelper.loggedInUser()}`)
      .send(testHelper.newBlogWithoutTitle)
      .expect(400);
  });

  test("verifies that delete works", async () => {
    const responseBeginning = await testHelper.currentDB();
    const blogToBeDeleted = responseBeginning[0];

    await api
      .delete(`/api/blogs/${blogToBeDeleted.id}`)
      .set("Authorization", `Bearer ${await testHelper.loggedInUser()}`)
      .expect(204);
    const responseEnd = await testHelper.currentDB();

    assert.strictEqual(responseEnd.length, testHelper.initialBlog.length - 1);
  });

  test("verifies that update works", async () => {
    const responseBeginning = await testHelper.currentDB();
    const blogToBeUpdated = responseBeginning[0];

    await api
      .put(`/api/blogs/${blogToBeUpdated.id}`)
      .send({ likes: 9999 })
      .expect(200);

    const responseUpdated = await testHelper.currentDB();

    assert.strictEqual(responseUpdated[0].likes, 9999);
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
