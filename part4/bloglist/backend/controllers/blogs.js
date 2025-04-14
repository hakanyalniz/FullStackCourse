// api/blogs
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogPromise = await Blog.find({});

  response.json(blogPromise);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const blogPromise = await blog.save();

  response.status(201).json(blogPromise);
});

module.exports = blogsRouter;
