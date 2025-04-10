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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
