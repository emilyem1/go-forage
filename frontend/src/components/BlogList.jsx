import BlogListItem from "./BlogListItem";
import "../styles/MushroomList.scss";
import BlogForm from "./BlogForm";

// <br/> just temporary spaces before styling
const BlogList = (props) => {
  const { blogs, setSelectedRoute, setBlogSelected } = props;
  return (
    <main>
      <br />
      <br />
      <BlogForm />
      <br />
      <ul className="mushroom-list">
        {blogs.map((blog) => (
          <BlogListItem
            className="mushroom-list"
            key={blog.id}
            blog={blog}
            setSelectedRoute={setSelectedRoute}
            setBlogSelected={setBlogSelected}
          />
        ))}
      </ul>
    </main>
  );
};

export default BlogList;
