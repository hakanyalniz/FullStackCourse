const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const result = blogs.reduce(
    (previousValue, currentValue) => previousValue + currentValue.likes,
    0
  );
  return result;
};

const favoriteBlog = (blogs) => {
  let favoriteBlog = { blog: undefined, largestLikes: 0 };
  blogs.forEach((blog) =>
    blog.likes > favoriteBlog.largestLikes
      ? ((favoriteBlog.largestLikes = blog.likes), (favoriteBlog.blog = blog))
      : null
  );
  return favoriteBlog.blog;
};

// go through the blogs
// for each name, add 1 to their counter for blog count
// return the biggest one
// Check if an entry with author name exists
// If it does not, create the entry
const mostBlogs = (blogs) => {
  const authorDict = {};
  blogs.forEach((blog) => {
    typeof authorDict[blog.author] === "object"
      ? (authorDict[blog.author].blogs += 1)
      : (authorDict[blog.author] = { author: blog.author, blogs: 1 });
  });

  let largestBlog = 0;
  let filteredMostBlogsDict;
  Object.values(authorDict).forEach((item) =>
    item.blogs > largestBlog
      ? ((largestBlog = item.blogs), (filteredMostBlogsDict = item))
      : undefined
  );

  return filteredMostBlogsDict;
};

const mostLikes = (blogs) => {
  const authorDict = {};
  blogs.forEach((blog) => {
    typeof authorDict[blog.author] === "object"
      ? (authorDict[blog.author].likes += blog.likes)
      : (authorDict[blog.author] = { author: blog.author, likes: blog.likes });
  });

  let largestBlog = 0;
  let filteredMostBlogsDict;
  Object.values(authorDict).forEach((item) =>
    item.likes > largestBlog
      ? ((largestBlog = item.likes), (filteredMostBlogsDict = item))
      : undefined
  );

  return filteredMostBlogsDict;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
