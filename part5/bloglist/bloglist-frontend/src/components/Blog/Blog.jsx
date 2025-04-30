import "./style.css";

const Blog = ({ blog }) => (
  <div className="blog-entry">
    <div>{blog.title}</div>
    <div>{blog.author}</div>
    <div>{blog.url}</div>
    <div>{blog.likes}</div>
  </div>
);

export default Blog;
