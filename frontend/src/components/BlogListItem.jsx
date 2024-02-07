// import "../styles/MushroomListItem.scss";
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
} from "@mui/material";

import BlogListMap from "./BlogListMap";
import BookmarkButton from "./BookmarkButton";

const BlogListItem = (props) => {
  const {
    blog,
    setSelectedRoute,
    setBlogSelected,
    onBookmarkClick,
    bookmarkedBlogs,
    userData,
    setUserSelected,
  } = props;
  const { user_id } = userData;

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
    setSelectedRoute("BLOGDETAILS");
  };
  return (
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
          <div
            onClick={() => {
              setUserSelected({
                id: blog.user_id,
                fullname: blog.username,
                email: blog.user_email,
                password: "asd",
                photo_url: blog.avatar,
              });
              setSelectedRoute("USERBLOGS");
            }}
          >
            <Avatar
              sx={{ width: 90, height: 90,'&:hover': {
                border: '4px solid lightgreen',
              } }}
              alt={blog.username}
              src={blog.avatar}
            />
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
          {blog.mushrooms.map((mushroom, index) => (
            <div key={index}>
              <img
                style={{ width: "22px" }}
                src={`images/${mushroom.mushroom_icon}`}
                alt={mushroom.mushroom_name}
              />
            </div>
          ))}
        </CardActions>
      </section>
    </Card>
  );
};

export default BlogListItem;
