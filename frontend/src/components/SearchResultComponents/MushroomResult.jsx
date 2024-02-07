import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

const MushroomResult = (props) => {
  const { mushroom, setSelectedRoute, setValue, setMushroomSelected } = props;

  const shortenedInfo =
    mushroom.info.length > 100
      ? `${mushroom.info.slice(0, 100)}...`
      : mushroom.info;


  const handleClick = () => {
    setMushroomSelected(mushroom)
    setSelectedRoute("MUSHROOMDETAILS");
    setValue(2);
  };

  return (
    <Card
      className="mushroom-result-item"
      sx={{
        width: 345,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 3,
        borderRadius: 3,
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: 5,
        },
      }}
    >
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
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleClick} size="small">Learn More</Button>
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
