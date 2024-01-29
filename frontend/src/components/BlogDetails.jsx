import "../styles/BlogDetails.scss";
import BlogListMap from "./BlogListMap";
import Comments from "./Comments";

const BlogDetails = (props) => {
  const { blog, comments } = props;
  return (
    <main>
      <section className="blog-container">
        <div className="map">
          <BlogListMap location={{ lat: blog.lat, lng: blog.long }} />
        </div>
        <header className="blog-header">
          <div className="blog-info">
            <h1>{blog.title}</h1>
            <div>By: {blog.username}</div>
          </div>
          <div className="mushrooms-info">
            <div>{blog.mushroom}</div>
            <img
              className="mushroom-image"
              src={`images/${blog.mushroom_image}`}
              alt={blog.mushroom}
            />
          </div>
        </header>
        <section>
          <p>{blog.content}</p>
        </section>
      </section>

      {comments.map(
        (comment) =>
          comment.blog_id === blog.id && <p>{<Comments comment={comment} />}</p>
      )}
    </main>
  );
};

export default BlogDetails;
