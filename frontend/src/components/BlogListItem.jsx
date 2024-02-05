import "../styles/MushroomListItem.scss";
import BlogListMap from "./BlogListMap";
import BookmarkButton from "./BookmarkButton";

const BlogListItem = (props) => {
  const {
    blog,
    setSelectedRoute,
    setBlogSelected,
    onBookmarkClick,
    bookmarkedBlogs,
    userData,
  } = props;
  const { user_id } = userData;

  const bookmarkSelect = bookmarkedBlogs[user_id].includes(blog.id)
    ? true
    : false;

  const handleClick = () => {
    setBlogSelected(blog);
    setSelectedRoute("BLOGDETAILS");
  };
  return (
    <main className="mushroom-list__item">
      <BookmarkButton
        blog={blog}
        onBookmarkClick={onBookmarkClick}
        bookmarkSelect={bookmarkSelect ? true : false}
      />

      <section onClick={handleClick}>
        <div>
          <BlogListMap location={{ lat: blog.lat, lng: blog.long }} />
        </div>
        <div>{blog.title}</div>
        <div>By: {blog.username}</div>
        {blog.mushrooms.map((mushroom, index) => (
          <div key={index}>
            {mushroom.mushroom_name}
            <img
              className="mushroom-list__image"
              src={`images/${mushroom.mushroom_image}`}
              alt={mushroom.mushroom_name}
            />
          </div>
        ))}
        <div className="mushroom-list__details">
          <footer className="mushroom-list__info">
            <div className="mushroom-list__description">{blog.content}</div>
          </footer>
        </div>
      </section>
    </main>
  );
};

export default BlogListItem;
