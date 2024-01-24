import React from "react";

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { mapStyles } from "../styles/Map";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "40vh",
};

const center = {
  lat: 53.7267,
  lng: -127.6476,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  draggable: false,
};

const Map = (props) => {
  const { location } = props;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);

  const onMapClick = React.useCallback((event) => {
    setMarkers((prev) => [
      ...prev,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={location}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <MarkerF
          //marker at set location
          key={new Date().toISOString()}
          position={location}
          icon={{
            url: "/mushroom_marker.svg",
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />
        {markers.map((marker) => (
          //marker on cursor click location
          <MarkerF
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "/mushroom_marker.svg",
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
