import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

const MushroomResult = (props) => {
  const { mushroom } = props;

  const shortenedInfo =
  mushroom.info.length > 100
    ? `${mushroom.info.slice(0, 100)}...`
    : mushroom.info;

  return (
    <Card className="mushroom-result-item" sx={{maxWidth: 345}}>
      <CardMedia
      component="img"
      alt={mushroom.name}
      height="140"
      image={`/images/${mushroom.image_url}`}
      className="mushroom-result-image"
      />

      <CardContent>
      <Typography gutterBottom variant="h5" component="div">
      {mushroom.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
      {shortenedInfo}
      </Typography>
      {/* <p>Edible? {mushroom.edible ? "Yes" : "No"}</p> */}

      </CardContent>
      <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Button size="small">Learn More</Button>
        <img
        style={{ width: "22px" }}
        className="mushroom-result-icon"
        src={`/images/${mushroom.icon}`}
      />
      </CardActions>
    </Card>
  );
};

export default MushroomResult;
