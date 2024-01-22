import BlogListItem from "./BlogListItem";
import "../styles/MushroomList.scss";

const BlogList = (props) => {
  const { blogs } = props;

  return (
    <ul className="mushroom-list">
      {blogs.map((blog) => (
        <BlogListItem
          className='mushroom-list'
          key={blog.id}
          blog={blog}
        />
      ))}
    </ul>
  );
};

export default BlogList;
