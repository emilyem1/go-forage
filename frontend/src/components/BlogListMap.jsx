import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { mapStyles } from "../styles/Map";

import { Button, Box, Typography, Divider } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import NearMeIcon from "@mui/icons-material/NearMe";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "40vh", //height for blog cards
};
const boundsBC = {
  north: 60,
  south: 48,
  west: -139,
  east: -114,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  // draggable: false,
  restriction: {
    latLngBounds: boundsBC,
    strictBounds: false,
  },
  draggableCursor: "pointer",
  minZoom: 5,
};

const BlogListMap = (props) => {
  const { location, showDirections } = props;
  const [map, setMap] = useState(null);

  // Function to handle map load
  const handleMapLoad = (map) => {
    setMap(map);
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const tempUserLocation = { lat: 50.676109, lng: -120.340836 };

  async function calculateRoute() {
    if (!map) return;
    //commented out section is for the user's geo location instead of teh temp location
    // const position = await new Promise((resolve, reject) => {
    //   navigator.geolocation.getCurrentPosition(resolve, reject);
    // });

    // const userLat = position.coords.latitude;
    // const userLng = position.coords.longitude;

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      // origin: new window.google.maps.LatLng(userLat, userLng),
      origin: new window.google.maps.LatLng(
        tempUserLocation.lat,
        tempUserLocation.lng
      ),
      destination: new window.google.maps.LatLng(location.lat, location.lng),
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={location}
        options={options}
        onLoad={handleMapLoad}
      >
        <MarkerF
          key={new Date().toISOString()}
          position={location}
          icon={{
            url: "./assets/mushroom_marker.svg",
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
      <div>
        {directionsResponse ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "flex",
                paddingRight:".5em"
              }}
            >
              <MapIcon />
              Distance: {distance}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
   
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "flex",
                paddingLeft:".5em"
              }}
            >
              <DirectionsCarIcon />
              Duration: {duration}
            </Typography>
          </Box>
        ) : (
          map !== null &&
          showDirections === true && (
            <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
              <NearMeIcon />
              Get Directions
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default BlogListMap;
