import BlogListItem from "./BlogListItem";
// import "../styles/MushroomList.scss";
import { Box } from "@mui/material";
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

const UserBlogs = (props) => {
  const {
    blogs,
    setSelectedRoute,
    setBlogSelected,
    bookmarkedBlogs,
    userData,
    onBookmarkClick,
  } = props;
  const selectedUser = blogs[1] !== undefined && blogs[1];

  return (
    <main>
      <div>
        {/* <Card
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
            <CardActions
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
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
        </Card> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            flexWrap: "wrap",
            padding: "10px",
            gap: "2rem",
          }}
        >
          {blogs
            .filter((blog) => blog.user_id === selectedUser.user_id)
            .map((blog) => (
              <BlogListItem
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
      </div>
    </main>
  );
};

export default UserBlogs;
