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

module.exports = {
  dummy,
  totalLikes,
};
