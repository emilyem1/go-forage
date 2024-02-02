import BlogListItem from "./BlogListItem";
import "../styles/MushroomList.scss";

const Favourites = (props) => {
  const { blogs, setSelectedRoute, setBlogSelected, favouriteBlogs,userData } = props;
  const {user_id}= userData;
  return (
    <main>
      <ul className="mushroom-list">
        
        {favouriteBlogs[user_id]? blogs
          .filter((blog) => (favouriteBlogs[user_id]).includes(blog.id))
          .map((blog) => (
            <BlogListItem
              className="mushroom-list"
              key={blog.id}
              blog={blog}
              setSelectedRoute={setSelectedRoute}
              setBlogSelected={setBlogSelected}
            />
          )):<p>No Favs</p>}
      </ul>
    </main>
  );
};

export default Favourites;
