import BlogListItem from "./BlogListItem";
import "../styles/MushroomList.scss";

const Favourites = (props) => {
  const { blogs, setSelectedRoute, setBlogSelected} =
    props;

  return (
    <main>
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

export default Favourites;
