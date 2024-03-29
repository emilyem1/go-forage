import { useReducer, useEffect } from "react";

export const ACTIONS = {
  SET_BLOG_DATA: "SET_BLOG_DATA",
  SELECT_BLOG: "SELECT_BLOG",
  SET_ROUTE: "SET_ROUTE",
  SET_MUSHROOM_DATA: "SET_MUSHROOM_DATA",
  SET_USER_DATA: "SET_USER_DATA",
  SET_COMMENT_DATA: "SET_COMMENT_DATA",
  SET_BLOG_UPDATE: "SET_BLOG_UPDATE",
  SET_BOOKMARKED_BLOGS: "SET_BOOKMARKED_BLOGS",
  BLOG_BOOKMARK_ADDED: "FAV_PHOTO_ADDED",
  COMMENT_ADDED: "COMMENT_ADDED",
  SELECT_USER: "SELECT_USER",
  SET_FRIEND_DATA: "SET_FRIEND_DATA",
  FRIEND_ADDED: "FRIEND_ADDED",
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
          user_id: decodeURIComponent(action.payload.user_id),
          fullname: decodeURIComponent(action.payload.fullname),
          email: decodeURIComponent(action.payload.email),
          profilePhoto: decodeURIComponent(action.payload.profilePhoto),
          isLoggedIn: action.payload.isLoggedIn === "true",
        },
      };

    case ACTIONS.SET_BLOG_UPDATE:
      return { ...state, blogUpdate: action.payload };

    case ACTIONS.SET_COMMENT_DATA:
      return { ...state, commentData: action.payload };

    case ACTIONS.SET_BOOKMARKED_BLOGS:
      return { ...state, bookmarkedBlogs: action.payload };

    case ACTIONS.BLOG_BOOKMARK_ADDED:
      const { user_id } = state.userData;
      const blogIdToAdd = action.payload.id;
      if (state.bookmarkedBlogs[user_id].includes(blogIdToAdd)) {
        // Remove the blogIdToAdd from the array
        const updatedBookmarkedBlogs = state.bookmarkedBlogs[user_id].filter(
          (blog_id) => blog_id !== blogIdToAdd
        );
        return {
          ...state,
          bookmarkedBlogs: {
            ...state.bookmarkedBlogs,
            [user_id]: updatedBookmarkedBlogs,
          },
        };
      } else {
        // Add the blogIdToAdd to the array
        return {
          ...state,
          bookmarkedBlogs: {
            ...state.bookmarkedBlogs,
            [user_id]: [...state.bookmarkedBlogs[user_id], blogIdToAdd],
          },
        };
      }

    case ACTIONS.COMMENT_ADDED:
      return { ...state, commentUpdate: action.payload };

    case ACTIONS.SELECT_USER:
      return { ...state, userSelected: action.payload };

    case ACTIONS.SET_FRIEND_DATA:
      return { ...state, friendData: action.payload };

    case ACTIONS.FRIEND_ADDED:
      const userId = state.userData.user_id;
      const friend = action.payload;
      const existingFriends = state.friendData[userId] || [];
      const existingFriendIndex = existingFriends.findIndex(
        (f) => f.id === friend.id
      );

      if (existingFriendIndex !== -1) {
        // If the friend already exists, remove it (unfollow action)
        const updatedFriends = [
          ...existingFriends.slice(0, existingFriendIndex),
          ...existingFriends.slice(existingFriendIndex + 1),
        ];
        return {
          ...state,
          friendData: {
            ...state.friendData,
            [userId]: updatedFriends,
          },
        };
      } else {
        // If the friend doesn't exist, add it (follow action)
        const updatedFriends = [...existingFriends, friend];
        return {
          ...state,
          friendData: {
            ...state.friendData,
            [userId]: updatedFriends,
          },
        };
      }

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
    selectedRoute: "BLOGLIST",
    mushroomData: [],
    userData: {
      user_id: null,
      fullname: "",
      email: "",
      profilePhoto: "",
      isLoggedIn: false,
    },
    commentData: [],
    blogUpdate: false,
    bookmarkedBlogs: {},
    commentUpdate: false,
    userSelected: false,
    friendData: {},
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
  }, []);

  useEffect(() => {
    fetch("http://localhost:8001/api/comments")
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: ACTIONS.SET_COMMENT_DATA, payload: data })
      )
      .then(() => {
        dispatch({ type: ACTIONS.COMMENT_ADDED, payload: false });
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [state.commentUpdate]);

  useEffect(() => {
    fetch("http://localhost:8001/api/bookmarks")
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: ACTIONS.SET_BOOKMARKED_BLOGS, payload: data })
      )
      .catch((error) => {
        console.error("Error fetching bookmarks:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8001/api/friends")
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: ACTIONS.SET_FRIEND_DATA, payload: data })
      )
      .catch((error) => {
        console.error("Error fetching friends:", error);
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

  const updateBookmarkedBlogs = (blog) => {
    dispatch({ type: ACTIONS.BLOG_BOOKMARK_ADDED, payload: blog });
  };

  const updateComments = (comment) => {
    dispatch({ type: ACTIONS.COMMENT_ADDED, payload: comment });
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
        user_id: cookieObject.user_id,
        fullname: cookieObject.fullname,
        email: cookieObject.email,
        profilePhoto: cookieObject.profilePhoto,
        isLoggedIn: cookieObject.isLoggedIn,
      },
    });
  }, [document.cookie]);

  const setUserSelected = (user) => {
    dispatch({ type: ACTIONS.SELECT_USER, payload: user });
  };

  const updatefriendData = (friend) => {
    dispatch({ type: ACTIONS.FRIEND_ADDED, payload: friend });
  };

  return {
    state,
    setBlogSelected,
    setSelectedRoute,
    setBlogUpdate,
    updateBookmarkedBlogs,
    updateComments,
    setUserSelected,
    updatefriendData,
  };
};

export default useApplicationData;
