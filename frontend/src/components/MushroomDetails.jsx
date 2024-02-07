import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import BlogResult from "./SearchResultComponents/BlogResult";

const MushroomDetails = (props) => {
  const { mushroomSelected, setBlogSelected, setSelectedRoute, setValue } = props;
  const [mushroomBlogs, setMushroomBlogs] = useState(null);
  const itemsPerPage = 3;

  if (!mushroomSelected.title || !mushroomSelected.image_url) {
    mushroomSelected.title = mushroomSelected.name;
    mushroomSelected.image_url = mushroomSelected.image;
  }

  const pagination = function (arrayToPaginate, itemsPerPage) {
    return arrayToPaginate.reduce(
      (paginatedArray, currentItem, currentIndex) => {
        if (currentIndex % itemsPerPage !== 0) {
          // Still within the current page, append the current item
          paginatedArray[paginatedArray.length - 1].push(currentItem);
        } else {
          // Start of a new page, create a new page (chunk) and append the current item
          paginatedArray.push([currentItem]);
        }
        return paginatedArray;
      },
      []
    );
  };

  useEffect(() => {
    // Make a request to the backend route with the search term
    fetch(
      `http://localhost:8001/api/search/mushroomBlogs?mushroom=${encodeURIComponent(
        mushroomSelected.title
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the search results
        setMushroomBlogs(data.mushroomBlogs.rows);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }, [mushroomSelected]);

  return (
    <main>
      <Card>
        <Grid container spacing={2}>
          {/* Left side: Image */}
          <Grid
            item
            xs={12}
            sm={4}
            sx={
              {
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
              }
            }
          >
            <CardMedia
              component="img"
              alt={mushroomSelected.title}
              image={`/images/${mushroomSelected.image_url}`}
              height={"100%"}
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
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <Box>
                  <Typography variant="h6" sx={{ textAlign: "left" }}>
                    Name
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: "left" }}>
                    {mushroomSelected.title}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ textAlign: "left" }}>
                    Info
                  </Typography>{" "}
                  <Typography variant="body1" sx={{ textAlign: "left" }}>
                    {mushroomSelected.info}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ textAlign: "left" }}>
                    Edible?
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: "left" }}>
                    {mushroomSelected.edible
                      ? "Yes, eat away!"
                      : "No, stay away!"}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      {mushroomBlogs && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" sx={{padding: '2rem'}}>Find them here!</Typography>
          <Carousel
            navButtonsAlwaysVisible={true}
            autoPlay={false}
            animation={"slide"}
            duration={750}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "80%",
            }}
          >
            {pagination(mushroomBlogs, itemsPerPage).map((page, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                {page.map((blog) => (
                  <BlogResult
                    key={blog.id}
                    blog={blog}
                    setBlogSelected={setBlogSelected}
                    setSelectedRoute={setSelectedRoute}
                    setValue={setValue}
                  ></BlogResult>
                ))}
              </div>
            ))}
          </Carousel>
        </Box>
      )}
    </main>
  );
};

export default MushroomDetails;
