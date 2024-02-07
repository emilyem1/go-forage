import BlogListMap from "./BlogListMap";
import BookmarkButton from "./BookmarkButton";
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

const FieldJournalItem = (props) => {
  const { blog, setSelectedRoute, setBlogSelected, onBookmarkClick,
    bookmarkedBlogs, userData } = props;

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
    setSelectedRoute("FIELDDETAILS");
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
      avatar={<Avatar alt={blog.username} src={blog.avatar} />}
      action={
        <IconButton>
          <BookmarkButton
            blog={blog}
            onBookmarkClick={onBookmarkClick}
            bookmarkSelect={bookmarkSelect ? true : false}
            user_id={user_id}
            userData={userData}
          />
        </IconButton>
      }
      title={blog.title}
      subheader={`By: ${blog.username} published: ${dateFormatter(
        blog.date
      )}`}
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

export default FieldJournalItem;