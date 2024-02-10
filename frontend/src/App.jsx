import React, { useState } from "react";
import useApplicationData from "./hooks/useApplicationData";
import "./App.css";

import Account from "./components/Account";
import BlogList from "./components/BlogList";
import PublicMap from "./components/PublicMap";
import Header from "./components/Header";
import MushroomList from "./components/MushroomList";
import FieldJournal from "./components/FieldJournal";
import LoginSignup from "./components/LoginSignup";
import BlogDetails from "./components/BlogDetails";
import SearchResults from "./components/SearchResults";
import FieldDetails from "./components/FieldDetails";
import MushroomDetails from "./components/MushroomDetails";
import UserBlogs from "./components/UserBlogs";
import { createTheme } from "@mui/material/styles";
import Bookmarks from "./components/Bookmarks";

function App() {
  const {
    state,
    setSelectedRoute,
    setBlogUpdate,
    updateBookmarkedBlogs,
    updateComments,
    setUserSelected,
    updatefriendData,
  } = useApplicationData();

  const {
    blogData,
    selectedRoute,
    mushroomData,
    userData,
    commentData,
    bookmarkedBlogs,
    userSelected,
    friendData,
  } = state;
  const [blogSelected, setBlogSelected] = useState(null);
  const [mushroomSelected, setMushroomSelected] = useState(null);
  // Currently selected tab = value
  const [value, setValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // Pass down theme, then use color="primary" etc to access
  const custom = {
    green: {
      main: "#4D6A66",
    },
    red: {
      main: "#c74343",
    },
    offwhite: {
      main: "#e6e6dd",
    },
    yellow: {
      main: "#d6cfa3",
    },
  };
  const theme = createTheme({
    palette: {
      primary: custom.green,
      secondary: custom.offwhite,
      error: custom.red,
      success: custom.yellow,
    },
  });

  return (
    <div className="App">
      <Header
        route={setSelectedRoute}
        userData={userData}
        value={value}
        setValue={setValue}
        setSearchTerm={setSearchTerm}
      />
      {selectedRoute === "BLOGLIST" ? (
        <BlogList
          blogs={blogData}
          setBlogSelected={setBlogSelected}
          setSelectedRoute={setSelectedRoute}
          mushrooms={mushroomData}
          setBlogUpdate={setBlogUpdate}
          bookmarkedBlogs={bookmarkedBlogs}
          userData={userData}
          onBookmarkClick={updateBookmarkedBlogs}
          setUserSelected={setUserSelected}
          theme={theme}
          friendData={friendData}
          updatefriendData={updatefriendData}
        />
      ) : selectedRoute === "PUBLIC" ? (
        <PublicMap
          blogData={blogData}
          blogSelected={blogSelected}
          setBlogSelected={setBlogSelected}
          setSelectedRoute={setSelectedRoute}
          theme={theme}
        />
      ) : selectedRoute === "BLOGDETAILS" ? (
        <BlogDetails
          blog={blogSelected}
          comments={commentData}
          bookmarkedBlogs={bookmarkedBlogs}
          userData={userData}
          onBookmarkClick={updateBookmarkedBlogs}
          updateComments={updateComments}
          theme={theme}
        />
      ) : selectedRoute === "MUSHROOMS" ? (
        <MushroomList
          mushrooms={mushroomData}
          setMushroomSelected={setMushroomSelected}
          setSelectedRoute={setSelectedRoute}
          users={userData}
        />
      ) : selectedRoute === "MUSHROOMDETAILS" ? (
        <MushroomDetails
          mushroomSelected={mushroomSelected}
          setBlogSelected={setBlogSelected}
          setSelectedRoute={setSelectedRoute}
          setValue={setValue}
        />
      ) : selectedRoute === "FIELDJOURNAL" ? (
        <FieldJournal
          email={userData.email}
          blogs={blogData}
          setBlogSelected={setBlogSelected}
          setSelectedRoute={setSelectedRoute}
          mushrooms={mushroomData}
          setBlogUpdate={setBlogUpdate}
          bookmarkedBlogs={bookmarkedBlogs}
          userData={userData}
          onBookmarkClick={updateBookmarkedBlogs}
          theme={theme}
        />
      ) : selectedRoute === "ACCOUNT" ? (
        <Account
          users={userData}
          friendData={friendData}
          setSelectedRoute={setSelectedRoute}
          setUserSelected={setUserSelected}
        />
      ) : selectedRoute === "LOGINSIGNUP" ? (
        <LoginSignup
          setSelectedRoute={setSelectedRoute}
          setValue={setValue}
          theme={theme}
        />
      ) : selectedRoute === "FIELDDETAILS" ? (
        <FieldDetails
          blog={blogSelected}
          comments={commentData}
          mushrooms={mushroomData}
          setBlogUpdate={setBlogUpdate}
          setSelectedRoute={setSelectedRoute}
          bookmarkedBlogs={bookmarkedBlogs}
          userData={userData}
          onBookmarkClick={updateBookmarkedBlogs}
          theme={theme}
        />
      ) : selectedRoute === "BOOKMARKS" ? (
        <Bookmarks
          blogs={blogData}
          setBlogSelected={setBlogSelected}
          setSelectedRoute={setSelectedRoute}
          mushrooms={mushroomData}
          setBlogUpdate={setBlogUpdate}
          bookmarkedBlogs={bookmarkedBlogs}
          userData={userData}
          onBookmarkClick={updateBookmarkedBlogs}
          setUserSelected={setUserSelected}
          theme={theme}
          friendData={friendData}
        />
      ) : selectedRoute === "USERBLOGS" ? (
        <UserBlogs
          blogs={blogData}
          setBlogSelected={setBlogSelected}
          setSelectedRoute={setSelectedRoute}
          bookmarkedBlogs={bookmarkedBlogs}
          userData={userData}
          onBookmarkClick={updateBookmarkedBlogs}
          userSelected={userSelected}
          setUserSelected={setUserSelected}
          friendData={friendData}
          theme={theme}
        />
      ) : (
        <SearchResults
          searchTerm={searchTerm}
          setBlogSelected={setBlogSelected}
          setSelectedRoute={setSelectedRoute}
          setValue={setValue}
          setMushroomSelected={setMushroomSelected}
          setUserSelected={setUserSelected}
          theme={theme}
        />
      )}
    </div>
  );
}

export default App;
