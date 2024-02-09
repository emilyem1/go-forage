import BlogListItem from "./BlogListItem";
// import "../styles/MushroomList.scss";
import { Box } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles'; 

const Bookmarks = (props) => {
  const {
    blogs,
    setSelectedRoute,
    setBlogSelected,
    bookmarkedBlogs,
    userData,
    onBookmarkClick,
    setUserSelected,
    friendData,
    theme
  } = props;
  const { user_id } = userData;

  return (
    <ThemeProvider theme={theme}>
    <main>
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent:"center",
            flexWrap: "wrap",
            padding:"10px",
            gap: "2rem",
          }}
        >
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
                  setUserSelected={setUserSelected}
                  friendData={friendData}
                />
              ))
          ) : (
            <p>No Favs</p>
          )}
        </Box>
      </div>
    </main>
    </ThemeProvider>
  );
};

export default Bookmarks;
