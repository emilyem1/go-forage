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
  // height: "40vh", //height for blog cards
  height: "80vh",
};

const center = {
  lat: 53.7267,
  lng: -127.6476,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  // draggable: false,
};

const Map = (props) => {
  const { location } = props;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDd3aomdLp5AMlwBs9WgviK_ZqqHu9t87k",
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

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
        // center={location} // blog card coordinates
        center={center}
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
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        {selected ? (
          <InfoWindowF
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>Mushrooms Here!</h2>
            </div>
          </InfoWindowF>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default Map;
