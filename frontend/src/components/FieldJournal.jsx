import FieldJournalItem from "./FieldJournalItem";
import BlogForm from "./BlogForm";
import { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import Collapse from "@mui/material/Collapse";

const FieldJournal = (props) => {
  const { email, setBlogSelected, setSelectedRoute, mushrooms } = props;
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
    <div className="field-journal">
      <br />
        Add a Blog:{<Switch checked={checked} onChange={handleChange} />}
      <div>
        <Collapse in={checked}>
          <BlogForm mushrooms={mushrooms} />
          <br />
        </Collapse>
      </div>
      {blogs.map(blog => (
        <FieldJournalItem
          key={blog.id}
          blog={blog}
          setSelectedRoute={setSelectedRoute}
          setBlogSelected={setBlogSelected}
        />
      ))}
    </div>
  );
};

export default FieldJournal;