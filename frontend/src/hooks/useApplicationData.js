import { useReducer, useEffect } from "react";
import { mapStyles } from "../styles/Map";

export const ACTIONS = {
  SET_BLOG_DATA: "SET_BLOG_DATA",
  SELECT_BLOG: "SELECT_BLOG",
  SET_ROUTE: "SET_ROUTE",
  SET_MUSHROOM_DATA: "SET_MUSHROOM_DATA",
  SET_COMMENT_DATA: "SET_COMMENT_DATA",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SELECT_BLOG:
      return { ...state, selectedBlog: action.payload };

    case ACTIONS.SET_BLOG_DATA:
      return { ...state, blogData: action.payload };

    case ACTIONS.SET_ROUTE:
      return { ...state, selectedRoute: action.payload };

    case ACTIONS.SET_MUSHROOM_DATA:
      return { ...state, mushroomData: action.payload };

    case ACTIONS.SET_COMMENT_DATA:
      return { ...state, commentData: action.payload };

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
    selectedRoute: "PUBLIC",
    mushroomData: [],
    commentData: [],
  });

  useEffect(() => {
    fetch("http://localhost:8001/api/blogs")
      .then((response) => response.json())
      .then((data) => dispatch({ type: ACTIONS.SET_BLOG_DATA, payload: data }))
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
    fetch("http://localhost:8001/api/mushrooms")
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: ACTIONS.SET_MUSHROOM_DATA, payload: data })
      )
      .catch((error) => {
        console.error("Error fetching mushrooms:", error);
      });
    fetch("http://localhost:8001/api/comments")
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: ACTIONS.SET_COMMENT_DATA, payload: data })
      )
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, []);

  const setBlogSelected = (blog) => {
    dispatch({ type: ACTIONS.SELECT_BLOG, payload: blog });
  };

  const setSelectedRoute = (route) => {
    dispatch({ type: ACTIONS.SET_ROUTE, payload: route });
  };

  return {
    state,
    setBlogSelected,
    setSelectedRoute,
  };
};

export default useApplicationData;
