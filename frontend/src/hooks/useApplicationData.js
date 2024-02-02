import { useReducer, useEffect } from "react";


export const ACTIONS = {
  SET_BLOG_DATA: "SET_BLOG_DATA",
  SELECT_BLOG: "SELECT_BLOG",
  SET_ROUTE: "SET_ROUTE",
  SET_MUSHROOM_DATA: "SET_MUSHROOM_DATA",
  SET_USER_DATA: "SET_USER_DATA",
  SET_COMMENT_DATA: "SET_COMMENT_DATA",
  SET_BLOG_UPDATE: "SET_BLOG_UPDATE",
  SET_FAVOURITE_BLOGS: "SET_FAVOURITE_BLOGS",
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

    case ACTIONS.SET_USER_DATA:
      return {
        ...state,
        userData: {
          fullname: decodeURIComponent(action.payload.fullname),
          email: decodeURIComponent(action.payload.email),
          profilePhoto: decodeURIComponent(action.payload.profilePhoto),
          isLoggedIn: action.payload.isLoggedIn === "true",
        },
      };

    case ACTIONS.SET_FAVOURITE_BLOGS:
      return { ...state, favouriteBlogs: action.payload };

    case ACTIONS.SET_BLOG_UPDATE:
      return { ...state, blogUpdate: action.payload };

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
    userData: {
      user_id: null,
      fullname: "",
      email: "",
      profilePhoto: "",
      isLoggedIn: false,
    },
    commentData: [],
    blogUpdate:false,
    favouriteBlogs:[],
  });

  useEffect(() => {
    fetch("http://localhost:8001/api/blogs")
      .then((response) => response.json())
      .then((data) => dispatch({ type: ACTIONS.SET_BLOG_DATA, payload: data }))
      .then(() => {
        dispatch({ type: ACTIONS.SET_BLOG_UPDATE, payload: false });
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, [state.blogUpdate]);

  useEffect(() => {
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

  const setBlogUpdate = (status) => {
    dispatch({ type: ACTIONS.SET_BLOG_UPDATE, payload: status });
  };

  useEffect(() => {
    const cookies = document.cookie;
    const cookieObject = cookies.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {});

    dispatch({
      type: ACTIONS.SET_USER_DATA,
      payload: {
        user_id: cookieObject.id,
        fullname: cookieObject.fullname,
        email: cookieObject.email,
        profilePhoto: cookieObject.profilePhoto,
        isLoggedIn: cookieObject.isLoggedIn,
      },
    });

    fetch(`http://localhost:8001/api/favourites/blogs/1`)
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: ACTIONS.SET_FAVOURITE_BLOGS, payload: data })
      )
      .catch((error) => {
        console.error("Error fetching favourite blogs:", error);
      });

  }, [document.cookie]);

  return {
    state,
    setBlogSelected,
    setSelectedRoute,
    setBlogUpdate,
  };
};

export default useApplicationData;
