// api/blogs
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const blogActions = require("../models/blogActions");

blogsRouter.get("/", async (request, response) => {
  response.json(await blogActions.findAllDB());
});

blogsRouter.post("/", async (request, response) => {
  const blogPromise = await blogActions.postDB(request.body);

  response.status(201).json(blogPromise);
});

module.exports = blogsRouter;
