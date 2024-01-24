import React from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  MarkerClusterer,
} from "@react-google-maps/api";
import { mapStyles } from "../styles/Map";

const libraries = ["places"];

const mapContainerStyle = {
  width: "80vw",
  height: "80vh",
};

const center = {
  lat: 53.7267,
  lng: -127.6476,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDd3aomdLp5AMlwBs9WgviK_ZqqHu9t87k",
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);

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
        center={center}
        options={options}
        onClick={(event) => {
          setMarkers((prev) => [
            ...prev,
            {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              time: new Date(),
            },
          ]);
        }}
      >
        {markers.map((marker) => (
          <MarkerF
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
