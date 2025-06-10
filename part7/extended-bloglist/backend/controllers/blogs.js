// api/blogs
const blogsRouter = require("express").Router();
const blogActions = require("../models/blogActions");

blogsRouter.get("/", async (request, response) => {
  response.json(await blogActions.findAllDB());
});

blogsRouter.post("/", async (request, response) => {
  if (request.user === undefined)
    return response.status(401).json({ error: "Unauthorized" });

  const blogPromise = await blogActions.postDB(request.body, request.user);

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

blogsRouter.delete("/:id", async (request, response, next) => {
  const deletedResource = await blogActions.deleteDB(request);

  if (!deletedResource)
    return response.status(401).json({ error: "token invalid" });
  response.status(200).json(deletedResource);
});

// receive a comment about a specific blog id
// take  the comment, then post it under that blogs message array
// on the frontend, fetch the comments to display them
blogsRouter.put("/:id/comments", async (request, response) => {
  const blogID = request.params.id;

  // request body contains the message
  const updateResource = await blogActions.updateDBComment(
    blogID,
    request.body
  );

  response.status(200).json(updateResource);
});

module.exports = blogsRouter;
