import React from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { mapStyles } from "../styles/Map";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "40vh", //height for blog cards
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  draggable: false,
};

const Map = (props) => {
  const { location } = props;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDd3aomdLp5AMlwBs9WgviK_ZqqHu9t87k",
    libraries,
  });

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
      >
        <MarkerF
          key={new Date().toISOString()}
          position={location}
          icon={{
            url: "/mushroom_marker.svg",
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default Map;
