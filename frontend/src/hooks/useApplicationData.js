import { useReducer, useEffect } from "react";
import { mapStyles } from "../styles/Map";

export const ACTIONS = {
  SET_BLOG_DATA: "SET_BLOG_DATA",
  SELECT_BLOG: "SELECT_BLOG",
  SET_MAP_CONFIG: "SET_MAP_CONFIG",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SELECT_BLOG:
      return { ...state, selectedBlog: action.payload };

    case ACTIONS.SET_BLOG_DATA:
      return { ...state, blogData: action.payload };

    case ACTIONS.SET_MAP_CONFIG:
      return { ...state, mapConfig: action.payload };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    selectedBlog: false,
    blogData: [],
    mapConfig: {
      mode: "PUBLIC",
      mapContainerStyle: {
        width: "100%",
        height: "40vh",
      },
      center: {
        lat: 53.7267,
        lng: -127.6476,
      },
      options: {
        styles: mapStyles,
        disableDefaultUI: true,
        draggable: true,
      },
    },
  });

  useEffect(() => {
    fetch("http://localhost:8001/api/blogs")
      .then((response) => response.json())
      .then((data) => dispatch({ type: ACTIONS.SET_BLOG_DATA, payload: data }));
  }, []);

  const setBlogSelected = (blog) => {
    dispatch({ type: ACTIONS.SELECT_BLOG, payload: blog });
  };

  const setMapConfig = (configUpdates) => {
    dispatch({ type: ACTIONS.SET_MAP_CONFIG, payload: { ...state.mapConfig, ...configUpdates } });
  };

  return {
    state,
    setBlogSelected,
    setMapConfig,
  };
};

export default useApplicationData;
