import { React, useRef, useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  Autocomplete,
} from "@react-google-maps/api";

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

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
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
  const [selectedPlace, setSelectedPlace] = useState(null);
  const searchInputRef = useRef("");

  const onSearchBarLoad = async (autocomplete) => {
    setSearchResult(autocomplete);
  };

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const searchLat = place.geometry.location.lat();
      const searchLng = place.geometry.location.lng();
      setSelectedPlace({ lat: searchLat, lng: searchLng });
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
      <Locate panTo={panTo} />
      <div className="search">
      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onSearchBarLoad}>
        <input
          type="text"
          placeholder="Search Your Location"
          ref={searchInputRef}
        />
      </Autocomplete>
      <button
        type="button"
        onClick={() => {
          if (searchResult) {
            setMapCenter({ lat: selectedPlace.lat, lng: selectedPlace.lng });
            searchInputRef.current.value = "";
          }
        }}
      >
        Search
      </button>
    </div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={10}
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
      className="locate"
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
