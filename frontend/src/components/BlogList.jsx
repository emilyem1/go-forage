import BlogListItem from "./BlogListItem";
import "../styles/MushroomList.scss";

const BlogList = (props) => {
  const { blogs } = props;

  return (
    <main>
      <ul className="mushroom-list">
        {blogs.map((blog) => (
          <BlogListItem className="mushroom-list" key={blog.id} blog={blog} />
        ))}
      </ul>
    </main>
  );
};

export default BlogList;
