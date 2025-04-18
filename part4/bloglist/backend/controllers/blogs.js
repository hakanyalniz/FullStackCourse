// api/blogs
const blogsRouter = require("express").Router();
const blogActions = require("../models/blogActions");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  response.json(await blogActions.findAllDB());
});

blogsRouter.post("/", async (request, response) => {
  const user = await User.findById(request.body.userId);

  const blogPromise = await blogActions.postDB(request.body, user);

  if (blogPromise === 400) response.status(400).send("Bad Request");

  response.status(201).json(blogPromise);
});

blogsRouter.put("/:id", async (request, response) => {
  const updateResource = await blogActions.updateDB(
    request.params.id,
    request.body
  );

  response.status(200).json(updateResource);
});

blogsRouter.delete("/:id", async (request, response) => {
  const deletedResource = await blogActions.deleteDB(request.params.id);

  response.status(204).json(deletedResource);
});

module.exports = blogsRouter;
