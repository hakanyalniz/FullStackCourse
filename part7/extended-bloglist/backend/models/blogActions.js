// Requests from backend use these functions to manipulate the database
const Blog = require("../models/blog");
const User = require("../models/user");

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
    message: [],
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

// $push allows us to push our message to the messages array
async function updateDBComment(blogID, requestMessage) {
  const updatedBlog = await Blog.findOneAndUpdate(
    { _id: blogID },
    { $push: { messages: requestMessage.message } },
    {
      returnOriginal: false,
    }
  );

  return updatedBlog;
}

async function deleteDB(request) {
  // Get the post userID
  // get the current userID from middleware
  // compare, if they match, delete post
  // if they do not match deny request

  const blogToBeDeleted = await Blog.findOne({ _id: request.params.id });
  const userForThatBlog = await User.findOne({ _id: blogToBeDeleted.user });

  if (userForThatBlog.id === request.user.id) {
    const deleteStatus = await Blog.deleteOne({ _id: request.params.id });
    if (deleteStatus.deletedCount === 0) return 400;

    return await findAllDB();
  } else {
    console.log("You can not delete this blog!");
  }
}

module.exports = { findAllDB, postDB, updateDB, deleteDB, updateDBComment };
