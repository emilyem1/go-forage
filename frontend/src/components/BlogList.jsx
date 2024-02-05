import BlogListItem from "./BlogListItem";
import Bookmarks from "./Bookmarks";

import "../styles/MushroomList.scss";
import BlogForm from "./BlogForm";

import { useState } from "react";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";

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
      <ul className="mushroom-list">
        {feed === "HOME" &&
          blogs.map((blog) => (
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
      </ul>
    </main>
  );
};

export default BlogList;
