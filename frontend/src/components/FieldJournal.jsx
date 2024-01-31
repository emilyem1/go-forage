import FieldJournalItem from "./FieldJournalItem";
import { useState, useEffect } from "react";

const FieldJournal = (props) => {
  const { email, setBlogSelected, setSelectedRoute } = props;
  const [blogs, setBlogs] = useState([]);

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