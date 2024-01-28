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
  const { blogData, setBlogSelected, setSelectedRoute } = props;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markerSelected, setMarkerSelected] = useState(null);
  const [mapCenter, setMapCenter] = useState(centerBC);
  const [searchResult, setSearchResult] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(centerBC);
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
      }
    } else {
      alert("Please enter text");
    }
  }

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
      <Autocomplete
        options={{ types: ["geocode"] }}
        // onPlaceChanged={onPlaceChanged}
        onLoad={onSearchBarLoad}
      >
        <input
          type="text"
          placeholder="Search Your Location"
          ref={searchInputRef}
        />
      </Autocomplete>
      <button type="submit" onClick={onPlaceChanged}>
        Search
      </button>

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
