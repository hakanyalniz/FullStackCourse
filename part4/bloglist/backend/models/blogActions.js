async function findAllDB() {
  const blogPromise = await Blog.find({});
  return blogPromise;
}

module.exports = { findAllDB };
