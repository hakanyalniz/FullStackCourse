const Blog = require("../models/blog");

async function findAllDB() {
  const blog = await Blog.find({}).populate("user", { username: 1, name: 1 });
  return blog;
}

async function postDB(requestBody, user) {
  if (requestBody.title === undefined || requestBody.url === undefined)
    return 400;

  const blog = new Blog({
    title: requestBody.title,
    author: requestBody.author,
    url: requestBody.url,
    likes: requestBody.likes,
    user: user.id,
  });

  const blogPromise = await blog.save();

  user.blogs = user.blogs.concat(blogPromise);
  await user.save();

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
