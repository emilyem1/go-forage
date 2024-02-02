import BlogListItem from "./BlogListItem";
import "../styles/MushroomList.scss";

const Favourites = (props) => {
  const { blogs, setSelectedRoute, setBlogSelected, favouriteBlogs } = props;

  return (
    <main>
      <ul className="mushroom-list">
        {blogs
          .filter((blog) => favouriteBlogs.includes(blog.id))
          .map((blog) => (
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

export default Favourites;
