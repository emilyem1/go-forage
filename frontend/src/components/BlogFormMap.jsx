import { React, useRef, useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  Autocomplete,
} from "@react-google-maps/api";
import { Divider, TextField, IconButton } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import "../styles/Map.scss";
import { mapStyles } from "../styles/Map";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "50vh",
  borderRadius: "15px",
};

const centerBC = {
  lat: 53.7267,
  lng: -127.6476,
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
  restriction: {
    latLngBounds: boundsBC,
    strictBounds: false,
  },
  minZoom: 5,
};

const BlogFormMap = (props) => {
  const { setFormData } = props;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [marker, setMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState(centerBC);
  const [searchResult, setSearchResult] = useState(null);
  const searchInputRef = useRef();

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
  const onMapClick = useCallback((event) => {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    setFormData((prevData) => ({
      ...prevData,
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng(),
    }));
  }, []);

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
    <div className="map-container">
      <div className="locate">
        <Locate panTo={panTo} />
      </div>
      <section className="search">
        <div className="search-bar">
          <Autocomplete
            options={{
              types: ["geocode"],
              componentRestrictions: { country: "CA" },
            }}
            onLoad={onSearchBarLoad}
          >
            <TextField
              sx={{ width: "60vw" }}
              label="Lets Go Forage!"
              type="text"
              placeholder="Search Your Location"
              ref={searchInputRef}
              color="success"
              focused
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
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={5}
        center={mapCenter}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {marker && (
          <MarkerF
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "./assets/mushroom_marker.svg",
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

function Locate({ panTo }) {
  return (
    <button
      type="button"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="./assets/compass.svg" alt="Locate Me" />
    </button>
  );
}

export default BlogFormMap;
