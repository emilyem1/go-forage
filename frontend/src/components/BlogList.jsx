import BlogListItem from "./BlogListItem";

import EditIcon from "@mui/icons-material/Edit";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";

// import "../styles/MushroomList.scss";
import BlogForm from "./BlogForm";
import { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
// Must use this to wrap html to pass in theme

const BlogList = (props) => {
  const {
    blogs,
    mushrooms,
    setSelectedRoute,
    setBlogSelected,
    setBlogUpdate,
    bookmarkedBlogs,
    userData,
    onBookmarkClick,
    setUserSelected,
    theme,
    friendData,
    updatefriendData,
    setShowDirections,
    showDirections
  } = props;

  const user_id = parseInt(userData.user_id);

  const friendsIDs = friendData[user_id]
    ? friendData[user_id].map((friend) => friend.id)
    : [];

  const [feed, setFeed] = useState("HOME");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Box
          sx={{
            transform: "translateZ(0px)",
            flexGrow: 1,
            display: "flex",
            marginLeft: "1%",
            marginTop: "1%",
            position: "sticky",
            top: "0",
          }}
        >
          <SpeedDial
            ariaLabel="SpeedDial"
            sx={{ position: "absolute", bottom: -100, right: 100 }}
            icon={
              <SpeedDialIcon openIcon={<EditIcon />} onClick={handleOpen} />
            }
          ></SpeedDial>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <BlogForm
            mushrooms={mushrooms}
            setBlogUpdate={setBlogUpdate}
            handleClose={handleClose}
            setOpen={setOpen}
            theme={theme}
          />
        </Modal>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            margin: "1% 0",
          }}
        >
          <Button
            onClick={() => {
              setFeed("HOME");
            }}
            variant="contained"
            color="primary"
          >
            Home Feed
          </Button>

          <Button
            onClick={() => {
              setFeed("FOLLOWING");
            }}
            variant="contained"
          >
            Following
          </Button>
        </Box>

        {feed === "HOME" && (
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
              {blogs.map((blog) => (
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
                  showDirections={showDirections}
                  setShowDirections={setShowDirections}
                />
              ))}
            </Box>
          </div>
        )}
        {feed === "FOLLOWING" && (
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
              {friendsIDs ? (
                blogs
                  .filter((blog) => friendsIDs.includes(blog.user_id))
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
                      showDirections={showDirections}
                      setShowDirections={setShowDirections}
                    />
                  ))
              ) : (
                <p>
                  Oops! Your following feed is empty like an untouched forest
                  floor. 🌳 Haven't followed any foragers yet? It's time to dive
                  into the mushroom community! Start by following fellow
                  foragers and watch your feed come to life with mushroom magic.
                  Happy foraging and connecting! 🍄✨
                </p>
              )}
            </Box>
          </div>
        )}
      </main>
    </ThemeProvider>
  );
};

export default BlogList;
