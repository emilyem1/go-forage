import { useState } from "react";

// import "../styles/BlogDetails.scss";
import BlogListMap from "./BlogListMap";
import Comments from "./Comments";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import {
  List,
  Divider,
  ListSubheader,
  TextField,
  InputAdornment,
  Button,
  Avatar,
} from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';

import SendIcon from '@mui/icons-material/Send';

const BlogDetails = (props) => {
  const { blog, comments,userData } = props;

  const [newComment, setNewComment] = useState({
    blog_Id: blog.id,
    commenter_Id: 1,
    message: "",
  });

  const handleChange = (event) => {
    const { name: input, value } = event.target;
    setNewComment((prevData) => ({
      ...prevData,
      [input]: value,
    }));
    console.log("Updated comment", newComment);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newComment.message.trim() === "") {
      // Handle error, e.g., show a message to the user
      console.error("Comment message cannot be empty");
      return;
    }

    try {
      const response = await fetch("http://localhost:8001/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        throw new Error(`Failed to post comment. Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Comment posted:", responseData);

      // Reset the comment box values after submission
      setNewComment({
        blog_Id: blog.id,
        commenter_Id: 1,
        message: "",
      });
    } catch (error) {
      console.error("Error when posting:", error.message);
    }
  };
  return (
    <main>
      <section className="blog-container">
        <div className="map">
          <BlogListMap location={{ lat: blog.lat, lng: blog.long }} />
        </div>
        <header className="blog-header">
          {blog.privacy ? <LockOpenIcon /> : <LockRoundedIcon />}
          <div className="blog-info">
            <h1>{blog.title}</h1>
            <div>By: {blog.username}</div>
          </div>

          {blog.mushrooms.map((mushroom, index) => (
            <div key={index} className="mushrooms-info">
              {mushroom.mushroom_name}
              <img
                className="mushroom-image"
                src={`images/${mushroom.mushroom_image}`}
                alt={mushroom.mushroom_name}
              />
            </div>
          ))}
        </header>
        <section>
          <p>{blog.content}</p>
        </section>
      </section>
      <List
        sx={{
          width: "100%",
          // padding: "10px",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        <ListSubheader>
          <form>
            <label>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" >
                      <Avatar alt={userData.fullname} src={userData.profilePhoto} />
                    </InputAdornment>
                  ),
                }}
                label={userData.fullname}
                type="text"
                name="message"
                value={newComment.message}
                onChange={handleChange}
                placeholder="Enter Comment"
              />
            </label>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSubmit}
            >
              Send
            </Button>
          </form>
        </ListSubheader>
        <div>
          {comments
            .filter((comment) => comment.blog_id === blog.id)
            .map((comment) => (
              <div key={comment.id}>
                <Comments comment={comment} />
                <Divider variant="inset" component="li" />
              </div>
            ))}
        </div>
      </List>
    </main>
  );
};

export default BlogDetails;
