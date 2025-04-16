// api/blogs
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const blogActions = require("../models/blogActions");

blogsRouter.get("/", async (request, response) => {
  response.json(await blogActions.findAllDB());
});

blogsRouter.post("/", async (request, response) => {
  const blogPromise = await blogActions.postDB(request.body);

  if (blogPromise === 400) response.status(400).send("Bad Request");

  response.status(201).json(blogPromise);
});

blogsRouter.delete("/:id", async (request, response) => {
  const deletedResource = await blogActions.deleteDB(request.params.id);

  response.status(204).json(deletedResource);
});

module.exports = blogsRouter;
