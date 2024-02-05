import BlogListItem from "./BlogListItem";
import Bookmarks from "./Bookmarks";

// import "../styles/MushroomList.scss";
import BlogForm from "./BlogForm";

import { useState } from "react";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";
import { Box } from "@mui/material";

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
      <button
        onClick={() => {
          setFeed("HOME");
        }}
      >
        Home Feed
      </button>
      <button
        onClick={() => {
          setFeed("FAVOURITES");
        }}
      >
        Favourite Blogs
      </button>
      {feed === "HOME" && (
        <div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
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
