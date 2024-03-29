import { React, useRef, useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
  Autocomplete,
} from "@react-google-maps/api";
import { ThemeProvider } from "@mui/material/styles";

import {
  Divider,
  TextField,
  Avatar,
  Card,
  CardActions,
  IconButton,
  CardHeader,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { mapStyles } from "../styles/Map";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "15px",
};

const centerBC = {
  lat: 53.7267,
  lng: -127.6476,
};

const tempUserLocation = { lat: 50.676109, lng: -120.340836 };

const boundsBC = {
  north: 60,
  south: 48,
  west: -139,
  east: -114,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  restriction: {
    latLngBounds: boundsBC,
    strictBounds: false,
  },
  minZoom: 5,
};

const PublicMap = (props) => {
  const { blogData, setBlogSelected, setSelectedRoute, theme } = props;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markerSelected, setMarkerSelected] = useState(null);
  const [mapCenter, setMapCenter] = useState(centerBC);
  const [searchResult, setSearchResult] = useState(null);
  const searchInputRef = useRef();

  const dateFormatter = (blogDate) => {
    const date = new Date(blogDate);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const onSearchBarLoad = async (autocomplete) => {
    setSearchResult(autocomplete);
  };

  async function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      console.log(place);
      if (place && place.geometry) {
        const searchLat = place.geometry.location.lat();
        const searchLng = place.geometry.location.lng();
        setMapCenter({ lat: searchLat, lng: searchLng });
        searchInputRef.current.value = "";
        mapRef.current.setZoom(14);
      }
    } else {
      alert("Please enter text");
    }
  }

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setMapCenter(centerBC);
      }
    );
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Card
        className="map-container"
        sx={{
          width: "90%",
          margin: "2rem",
          boxShadow: 3,
          borderRadius: 3,
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: 5,
          },
        }}
      >
        <CardHeader
          title="Public Spots!"
          subheader="Uncover Nature's Treasures: Mushroom Maps"
        ></CardHeader>
        <div className="locate">
          <Locate panTo={panTo} />
        </div>
        <section className="search" style={{}}>
          <div className="search-bar">
            <Autocomplete
              options={{
                types: ["geocode"],
                componentRestrictions: { country: "CA" },
              }}
              onLoad={onSearchBarLoad}
            >
              <TextField
                sx={{
                  width: "40vw",
                  backgroundColor: "#e6e6dd45",
                  boxShadow: 3,
                  borderRadius: 3,
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: 5,
                  },
                  "& input::placeholder": {
                    color: "black",
                  },
                }}
                label="Let's Go Forage!"
                type="text"
                placeholder="Search Your Location"
                ref={searchInputRef}
                color="primary"
                focused
                InputProps={{
                  style: {
                    color: "#4D6A66",
                  },
                }}
              />
            </Autocomplete>
          </div>
          <div className="search-button">
            <Divider sx={{ height: 55 }} orientation="vertical" />
            <IconButton
              onClick={onPlaceChanged}
              sx={{ pr: "18px" }}
              type="button"
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </div>
        </section>
        <section>
          <GoogleMap
            id="map"
            mapContainerStyle={mapContainerStyle}
            zoom={5}
            center={mapCenter}
            options={options}
            onLoad={onMapLoad}
          >
            {blogData.map((blog) => (
              <MarkerF
                key={blog.id}
                position={{ lat: blog.lat, lng: blog.long }}
                icon={{
                  url:
                    blog.mushrooms.length > 1
                      ? "./assets/many_mushrooms_marker.svg"
                      : "./assets/mushroom_marker.svg",
                  scaledSize: new window.google.maps.Size(30, 30),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                }}
                onClick={() => {
                  setMarkerSelected(blog);
                }}
              />
            ))}

            {markerSelected ? (
              <InfoWindowF
                position={{ lat: markerSelected.lat, lng: markerSelected.long }}
                onCloseClick={() => {
                  setMarkerSelected(null);
                }}
              >
                <div
                  onClick={() => {
                    setBlogSelected(markerSelected);
                    setSelectedRoute("BLOGDETAILS");
                  }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          alt={markerSelected.username}
                          src={markerSelected.avatar}
                        />
                      }
                      title={markerSelected.title}
                      subheader={
                        <div>
                          <div>By: {markerSelected.username}</div>{" "}
                          <div>
                            Published: {dateFormatter(markerSelected.date)}
                          </div>
                        </div>
                      }
                    />
                    <CardActions
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      {markerSelected.mushrooms.map((mushroom, index) => (
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
                </div>
              </InfoWindowF>
            ) : null}
          </GoogleMap>
        </section>
      </Card>
    </ThemeProvider>
  );
};

function Locate({ panTo }) {
  return (
    <button
      type="button"
      onClick={() => {
        panTo(tempUserLocation);
        //commented out section is for actual user geo loc
        // navigator.geolocation.getCurrentPosition(
        //   (position) => {
        //     panTo({
        //       lat: position.coords.latitude,
        //       lng: position.coords.longitude,
        //     });
        //   },
        //   () => null
        // );
      }}
    >
      <img src="./assets/compass.svg" alt="Locate Me" />
    </button>
  );
}

export default PublicMap;
