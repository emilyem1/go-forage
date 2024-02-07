import BlogListItem from "./BlogListItem";
// import "../styles/MushroomList.scss";
import { Box } from "@mui/material";

const UserBlogs = (props) => {
  const {
    blogs,
    setSelectedRoute,
    setBlogSelected,
    bookmarkedBlogs,
    userData,
    onBookmarkClick,
  } = props;
  const { user_id } = userData;

  return (
    <main>
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            flexWrap: "wrap",
            padding: "10px",
            gap: "2rem",
          }}
        >
          {blogs
            .filter((blog) => blog.user_id=== 1)
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
            ))}
        </Box>
      </div>
    </main>
  );
};

export default UserBlogs;
