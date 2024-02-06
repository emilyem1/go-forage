import FieldJournalItem from "./FieldJournalItem";
import BlogForm from "./BlogForm";
import { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";
import { Box, Button } from "@mui/material";

const FieldJournal = (props) => {
  const { email, setBlogSelected, setSelectedRoute, mushrooms, onBookmarkClick, bookmarkedBlogs, userData, setBlogUpdate } = props;
  const [blogs, setBlogs] = useState([]);
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    console.log('Current email:', email);
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8001/api/journal?email=${email}`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };
    fetchData();
  }, [email]);

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
          flexDirection: "column",
          alignContent:"center",
          flexWrap: "wrap",
          padding:"10px",
          gap: "2rem",
        }}
      >
        {blogs.map((blog) => (
          <FieldJournalItem
          mushrooms={mushrooms}
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
    </main>
  );
};

export default FieldJournal;