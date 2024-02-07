import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

const MushroomDetails = (props) => {
  const { mushroomSelected } = props;
  console.log(mushroomSelected);
  if (!mushroomSelected.title || !mushroomSelected.image_url) {
    mushroomSelected.title = mushroomSelected.name;
    mushroomSelected.image_url = mushroomSelected.image;
  }

  return (
    <main>
      <Card>
        <Grid container spacing={2}>
          {/* Left side: Image */}
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              alt={mushroomSelected.title}
              image={`/images/${mushroomSelected.image_url}`}
              height={'100%'}
            />
          </Grid>

          {/* Right side: Information */}
          <Grid item xs={12} sm={8}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" gutterBottom>
                {mushroomSelected.title}
              </Typography>
              <Typography variant="body1" style={{ textAlign: "left" }}>
                <Typography variant="h6">Name</Typography>
                {mushroomSelected.title}
              </Typography>
              <Typography variant="body1" style={{ textAlign: "left" }}>
                <Typography variant="h6">Info</Typography>{" "}
                {mushroomSelected.info}
              </Typography>
              <Typography variant="body1" style={{ textAlign: "left" }}>
                <Typography variant="h6">Edible?</Typography>
                {mushroomSelected.edible ? "Yes, eat away!" : "No, stay away!"}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </main>
  );
};

export default MushroomDetails;
