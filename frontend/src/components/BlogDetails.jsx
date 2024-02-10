import { useState } from "react";

// import "../styles/BlogDetails.scss";

import FollowButton from "./FollowButton";
import BlogListMap from "./BlogListMap";
import BookmarkButton from "./BookmarkButton";
import Comments from "./Comments";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { ThemeProvider } from "@mui/material/styles";

import {
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
  theme,
  Box,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

const BlogDetails = (props) => {
  const {
    blog,
    comments,
    userData,
    onBookmarkClick,
    bookmarkedBlogs,
    updateComments,
    theme,
    friendData,
    updatefriendData,

  } = props;
  const { user_id } = userData;

  const bookmarkSelect =
    userData.isLoggedIn && bookmarkedBlogs[user_id].includes(blog.id)
      ? true
      : false;

  const [newComment, setNewComment] = useState({
    blog_Id: blog.id,
    commenter_Id: 1,
    message: "",
  });

  const dateFormatter = (blogDate) => {
    const date = new Date(blogDate);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleChange = async (event) => {
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
      updateComments(true);
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
    <ThemeProvider theme={theme}>
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
              <div>
                <Avatar

                  sx={{
                    width: 90,
                    height: 90,
                    "&:hover": {
                      border: "4px solid #879b65",
                      cursor: "pointer",
                    },
                  }}
                  alt={blog.username}
                  src={blog.avatar}
                />
                <div
                  style={{
                    paddingTop: ".5em",
                  }}
                >
                  <FollowButton
                    userData={userData}
                    blog={blog}
                    friendData={friendData}
                    updatefriendData={updatefriendData}
                  />
                </div>
              </div>
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

          <CardMedia>
            <BlogListMap location={{ lat: blog.lat, lng: blog.long }} />
          </CardMedia>
          <CardContent>
            <Typography variant="body1" color="text.primary">
              {blog.content}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ marginLeft: "2%" }}>
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
            </Box>
          </CardContent>
        </Card>

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
            {userData.isLoggedIn ? (
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
            ) : (
              <TextField
                sx={{ width: "70vw" }}
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Avatar />
                    </InputAdornment>
                  ),
                }}
                name="message"
                value={""}
                placeholder="Login to add comments!"
              />
            )}
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
        </Card>
      </main>
    </ThemeProvider>
  );
};

export default BlogDetails;
