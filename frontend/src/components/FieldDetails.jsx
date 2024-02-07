import React, { useState } from "react";
import BlogListMap from "./BlogListMap";
import Comments from "./Comments";
import BlogEdit from "./BlogEdit";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import SendIcon from "@mui/icons-material/Send";
import BookmarkButton from "./BookmarkButton";
import { ThemeProvider } from '@mui/material/styles'; 
import {
  Stack,
  List,
  Divider,
  ListSubheader,
  TextField,
  InputAdornment,
  Button,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  CardHeader,
} from "@mui/material";

const FieldDetails = (props) => {
  const {
    blog,
    comments,
    mushrooms,
    setBlogUpdate,
    setSelectedRoute,
    userData,
    onBookmarkClick,
    bookmarkedBlogs,
    updateComments,
    theme,
  } = props;
  const [editMode, setEditMode] = useState(false);
  const { user_id } = userData;

  const bookmarkSelect =
    userData.isLoggedIn &&
    bookmarkedBlogs &&
    bookmarkedBlogs[user_id]?.includes(blog.id);

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
  };

  const dateFormatter = (blogDate) => {
    const date = new Date(blogDate);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newComment.message.trim() === "") {
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
    } catch (error) {
      console.error("Error when posting:", error.message);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8001/api/blogs/${blog.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete blog. Status: ${response.status}`);
      }
      console.log("Blog Deleted Successfully");
    } catch (error) {
      console.error("Error deleting blog:", error.message);
    }
    setSelectedRoute("FIELDJOURNAL");
  };

  return (
    <ThemeProvider theme={theme}>
    <main>
      {editMode ? (
        <BlogEdit
          setEditMode={setEditMode}
          mushrooms={mushrooms}
          existingBlog={blog}
          setBlogUpdate={setBlogUpdate}
          setSelectedRoute={setSelectedRoute}
        />
      ) : (
        <main>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              margin: "25px",
              boxShadow: 3,
              borderRadius: 3,
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: 5,
              },
            }}
          >
            <CardHeader
        avatar={
          <Avatar
            sx={{ width: 90, height: 90 }}
            alt={blog.username}
            src={blog.avatar}
          />
        }
        action={
          <IconButton sx={{ transform: "translate(25%,-31.5%)" }}>
            <BookmarkButton
              blog={blog}
              onBookmarkClick={onBookmarkClick}
              bookmarkSelect={bookmarkSelect ? true : false}
              user_id={user_id}
              userData={userData}
            />
          </IconButton>
        }
        title={<h2>{blog.title}</h2>}
        subheader={
          <div>
            <div>By: {blog.username}</div>{" "}
            <div>Published: {dateFormatter(blog.date)}</div>
          </div>
        }
      />
            <CardActions
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ marginLeft: '2%'}}>
                {blog.mushrooms.map((mushroom, index) => (
                    <img
                      key={index}
                      style={{ width: "22px" }}
                      src={`images/${mushroom.mushroom_icon}`}
                      alt={mushroom.mushroom_name}
                    />
                ))}
              </div>
              {blog.privacy ? <LockOpenIcon /> : <LockRoundedIcon />}
            </CardActions>
            <CardMedia>
              <BlogListMap location={{ lat: blog.lat, lng: blog.long }} />
            </CardMedia>
            <CardContent>
              <Typography variant="body1" color="text.primary">
                {blog.content}
              </Typography>
            </CardContent>
          </Card>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditClick}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </Stack>
          <br />
          <List
            sx={{
              width: "100%",
              paddingTop: "10px",
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
                    sx={{ width: "70vw" }}
                    multiline
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Avatar
                            alt={userData.fullname}
                            src={userData.profilePhoto}
                          />
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
                  sx={{
                    marginLeft: "1%",
                  }}
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
      )}
    </main>
    </ThemeProvider>
  );
};

export default FieldDetails;
