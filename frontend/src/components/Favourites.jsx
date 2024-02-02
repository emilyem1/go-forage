import BlogListItem from "./BlogListItem";
import "../styles/MushroomList.scss";

const Favourites = (props) => {
  const { blogs, setSelectedRoute, setBlogSelected, favouriteBlogs,userData } = props;
  const user_id= userData.user_id;
  console.log(userData)
  return (
    <main>
      <ul className="mushroom-list">
        
        {user_id? blogs
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
