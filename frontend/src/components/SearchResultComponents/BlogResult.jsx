import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

import Map from "../BlogListMap";

const BlogResult = (props) => {
  const { blog, setBlogSelected, setSelectedRoute, setValue } = props;

  const shortenedInfo =
    blog.content.length > 100
      ? `${blog.content.slice(0, 100)}...`
      : blog.content;

  const handleClick = () => {
    setBlogSelected(blog);
    setSelectedRoute("BLOGDETAILS");
    setValue(0);
  };

  return (
    <Card
      className="blog-result-item"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxWidth: 345,
        height: 550,
        boxShadow: 3,
        borderRadius: 3,
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: 5,
        },
      }}
    >
      <CardMedia>
        <Map location={{ lat: blog.lat, lng: blog.long }}></Map>
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {shortenedInfo}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="small" onClick={handleClick}>Read More</Button>
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
    </Card>
  );
};

export default BlogResult;
