const initialBlog = [
  {
    title: "How to tame your dragon",
    author: "Taylor",
    url: "www.tamingDragons.com/post01",
    likes: 1002,
  },
  {
    title: "The chilling tale of snowman",
    author: "Drake",
    url: "www.allthingssnow.com/snowman/01/chill",
    likes: 2,
  },
];

const newFullBlog = {
  title: "The moon and the sky",
  author: "Rossy",
  url: "www.spaceandstuff/blog/2024/3",
  likes: 342,
};

const newBlogWithoutLikes = {
  title: "The red color and chemicals",
  author: "Alberto",
  url: "www.whackystuff.org/dev/posts/2004/30",
};

const newBlogWithoutTitle = {
  author: "Alberto",
  url: "www.whackystuff.org/dev/posts/2004/30",
  likes: 342,
};

module.exports = {
  initialBlog,
  newFullBlog,
  newBlogWithoutLikes,
  newBlogWithoutTitle,
};
