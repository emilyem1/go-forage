import BlogListItem from "./BlogListItem";
import "../styles/MushroomList.scss";

const Bookmarks = (props) => {
  const {
    blogs,
    setSelectedRoute,
    setBlogSelected,
    bookmarkedBlogs,
    userData,
    onBookmarkClick
  } = props;
  const { user_id } = userData;
  console.log(user_id);
  return (
    <main>
      <ul className="mushroom-list">
        {bookmarkedBlogs[user_id] ? (
          blogs
            .filter((blog) => bookmarkedBlogs[user_id].includes(blog.id))
            .map((blog) => (
              <BlogListItem
              className="mushroom-list"
              key={blog.id}
              blog={blog}
              setBlogSelected={setBlogSelected}
              setSelectedRoute={setSelectedRoute}
              bookmarkedBlogs={bookmarkedBlogs}
              userData={userData}
              onBookmarkClick={onBookmarkClick}
            />
            ))
        ) : (
          <p>No Favs</p>
        )}
      </ul>
    </main>
  );
};

export default Bookmarks;
