import BlogListItem from "./BlogListItem";
import "../styles/MushroomList.scss";
import BlogForm from "./BlogForm";

import { useState } from "react";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";

const BlogList = (props) => {
  const { blogs, mushrooms, setSelectedRoute, setBlogSelected, setBlogUpdate } =
    props;

  const [checked, setChecked] = useState(false);
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
      <ul className="mushroom-list">
        {blogs.map((blog) => (
          <BlogListItem
            className="mushroom-list"
            key={blog.id}
            blog={blog}
            setSelectedRoute={setSelectedRoute}
            setBlogSelected={setBlogSelected}
          />
        ))}
      </ul>
    </main>
  );
};

export default BlogList;
