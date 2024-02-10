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
    theme,
    updatefriendData
  } = props;
  const { user_id } = userData;

  return (
    <ThemeProvider theme={theme}>
    <main style={{ marginTop:'2%'}}>
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
                  updatefriendData={updatefriendData}
                />
              ))
          ) : (
            <p>Looks like your mushroom basket is as empty as a forest before the rain! 🍄 But fear not, adventurous forager! Just like finding hidden treasures in the woods, your journey to discovering delightful blogs begins now. Start bookmarking your favorite mushroom-related reads and let your collection flourish like a lush fungi patch after a spring shower! Happy foraging! 🌿🍄</p>
          )}
        </Box>
      </div>
    </main>
    </ThemeProvider>
  );
};

export default Bookmarks;
