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

async function updateDB(requestID, requestBody) {
  const updatedBlog = await Blog.findOneAndUpdate(
    { _id: requestID },
    requestBody,
    {
      returnOriginal: false,
    }
  );

  return updatedBlog;
}

async function deleteDB(requestID) {
  const deleteStatus = await Blog.deleteOne({ _id: requestID });

  if (deleteStatus.deletedCount === 0) return 400;

  return deleteStatus;
}

module.exports = { findAllDB, postDB, updateDB, deleteDB };
