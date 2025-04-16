const { request } = require("../app");
const Blog = require("../models/blog");

async function findAllDB() {
  return await Blog.find({});
}

async function postDB(requestBody) {
  if (requestBody.title === undefined || requestBody.url === undefined)
    return 400;

  const blog = new Blog(requestBody);
  const blogPromise = await blog.save();

  return blogPromise;
}

module.exports = { findAllDB, postDB };
