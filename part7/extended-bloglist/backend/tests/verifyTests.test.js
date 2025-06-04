const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const dummyData = require("./dummyData");

test("Dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("Total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(dummyData.listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("of a big list is calculated right", () => {
    const result = listHelper.totalLikes(dummyData.listWithFourBlog);
    assert.strictEqual(result, 65);
  });
});

describe("Most likes", () => {
  const mostLikedBlog = {
    _id: "5a422aa71b54a676234d1799",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 30,
    __v: 0,
  };

  test("for a big list", () => {
    const result = listHelper.favoriteBlog(dummyData.listWithFourBlog);
    assert.deepStrictEqual(result, mostLikedBlog);
  });
});

describe("The author with most blog", () => {
  test("with small list is correct", () => {
    const result = listHelper.mostBlogs(dummyData.listWithFourBlog);
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", blogs: 2 });
  });

  test("with big list is correct", () => {
    const result = listHelper.mostBlogs(dummyData.listWithNineBlogs);
    assert.deepStrictEqual(result, { author: "Dmitri", blogs: 4 });
  });
});

describe("The author with most likes", () => {
  test("with small list is correct", () => {
    const result = listHelper.mostLikes(dummyData.listWithFourBlog);
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 40 });
  });

  test("with big list is correct", () => {
    const result = listHelper.mostLikes(dummyData.listWithNineBlogs);
    assert.deepStrictEqual(result, { author: "Dmitri", likes: 2020 });
  });
});
