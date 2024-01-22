import { useReducer, useEffect } from "react";

export const ACTIONS = {
  SET_BLOG_DATA: "SET_BLOG_DATA",
  SELECT_BLOG: "SELECT_BLOG",
  DISPLAY_BLOG_DETAILS: "DISPLAY_BLOG_DETAILS",
};

function reducer(state, action) {
  switch (action.type) {

    case ACTIONS.SELECT_BLOG:
      return { ...state, selectedBlog: action.payload };

    case ACTIONS.SET_BLOG_DATA:
      return { ...state, blogData: action.payload };

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
  });


  useEffect(() => {
    fetch("http://localhost:8001/api/blogs")
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: ACTIONS.SET_BLOG_DATA, payload: data })
      );
  }, []);

  const setBlogSelected = (blog) => {
    dispatch({ type: ACTIONS.SELECT_BLOG, payload: blog });
  };

  return {
    state,
    setBlogSelected,
  };
};

export default useApplicationData;
