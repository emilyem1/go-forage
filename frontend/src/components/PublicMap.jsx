import { React, useRef, useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
  Autocomplete,
} from "@react-google-maps/api";
import { mapStyles } from "../styles/Map";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "80vh",
};

const centerBC = {
  lat: 53.7267,
  lng: -127.6476,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
};

const PublicMap = (props) => {
  const { blogData, setBlogSelected, setSelectedRoute } = props;


  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markerSelected, setMarkerSelected] = useState(null);
  const [mapCenter, setMapCenter] = useState(centerBC);


  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
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
      <Autocomplete  >
        <input type="text" placeholder="Destination" />
      </Autocomplete>

      <GoogleMap
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
              url: "./assets/mushroom_marker.svg",
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
              <h3>{markerSelected.title}</h3>
              <p>{markerSelected.username}</p>
            </div>
          </InfoWindowF>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default PublicMap;
