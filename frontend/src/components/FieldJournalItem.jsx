import BlogListMap from "./BlogListMap";
import BookmarkButton from "./BookmarkButton";
import BlogEdit from "./BlogEdit";
import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Avatar,
  IconButton,
  CardHeader,
  Modal
} from "@mui/material";

const FieldJournalItem = (props) => {
  const {
    blog,
    setSelectedRoute,
    setBlogSelected,
    onBookmarkClick,
    bookmarkedBlogs,
    userData,
    mushrooms,
    setBlogUpdate,
    theme,
    selectedRoute
  } = props;

  const [editMode, setEditMode] = useState(false);
  const { user_id } = userData;
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const bookmarkSelect =
    userData.isLoggedIn &&
    bookmarkedBlogs &&
    bookmarkedBlogs[user_id]?.includes(blog.id);


  const dateFormatter = (blogDate) => {
    const date = new Date(blogDate);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const shortenedInfo =
    blog.content.length > 100
      ? `${blog.content.slice(0, 100)}...`
      : blog.content;

  const handleClick = () => {
    setBlogSelected(blog);
    setSelectedRoute("FIELDDETAILS");
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
      window.location.reload();
      console.log("Blog Deleted Successfully");
    } catch (error) {
      console.error("Error deleting blog:", error.message);
    }
  };

  return (
    <main>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BlogEdit
          setEditMode={setEditMode}
          mushrooms={mushrooms}
          existingBlog={blog}
          setBlogUpdate={setBlogUpdate}
          setSelectedRoute={setSelectedRoute}
          theme={theme}
          handleClose={handleClose} 
          setOpen={setOpen}
          selectedRoute={selectedRoute}
        />
      </Modal>
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          sx={{marginLeft:'3.7%', marginBottom:'2%'}}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDeleteClick}
          sx={{marginRight:'3%', marginBottom:'2%'}}
        >
          Delete
        </Button>
      </div>
     
      <section onClick={handleClick}>
        <CardMedia>
          <BlogListMap location={{ lat: blog.lat, lng: blog.long }} />
        </CardMedia>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {shortenedInfo}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button size="small">Read More</Button>
          <div>
            {blog.mushrooms.map((mushroom, index) => (
                <img
                  key={index}
                  style={{ width: "22px" }}
                  src={`images/${mushroom.mushroom_icon}`}
                  alt={mushroom.mushroom_name}
                />
              
            ))}
          </div>
        </CardActions>
      </section>
    </Card>
    </main>
  );
};

export default FieldJournalItem;
