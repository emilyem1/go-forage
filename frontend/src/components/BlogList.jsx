import BlogListItem from "./BlogListItem";
import Bookmarks from "./Bookmarks";

// import "../styles/MushroomList.scss";
import BlogForm from "./BlogForm";

import { useState } from "react";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";
import { Box, Button } from "@mui/material";

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
  } = props;

  const [checked, setChecked] = useState(false);
  const [feed, setFeed] = useState("HOME");
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <main>
      Add a Blog:{<Switch checked={checked} onChange={handleChange} />}
      <div>
        <Collapse in={checked}>
          <BlogForm mushrooms={mushrooms} setBlogUpdate={setBlogUpdate} />
          <br />
        </Collapse>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          onClick={() => {
            setFeed("HOME");
          }}
          variant="contained"
        >
          Home Feed
        </Button>

        <Button
          onClick={() => {
            setFeed("FAVOURITES");
          }}
          variant="contained"
        >
          Favourite Blogs
        </Button>
      </Box>
      
      {feed === "HOME" && (
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
              />
            ))}
          </Box>
        </div>
      )}
      {feed === "FAVOURITES" && (
        <Bookmarks
          blogs={blogs}
          setBlogSelected={setBlogSelected}
          setSelectedRoute={setSelectedRoute}
          bookmarkedBlogs={bookmarkedBlogs}
          userData={userData}
          onBookmarkClick={onBookmarkClick}
        />
      )}
    </main>
  );
};

export default BlogList;
