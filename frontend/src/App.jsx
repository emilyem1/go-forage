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

function App() {
  const { state, setSelectedRoute, setBlogUpdate, updateBookmarkedBlogs, updateComments } =
    useApplicationData();
  const {
    blogData,
    selectedRoute,
    mushroomData,
    userData,
    commentData,
    bookmarkedBlogs,
  } = state;
  const [blogSelected, setBlogSelected] = useState(null);
  // Currently selected tab = value
  const [value, setValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

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
      />
      ) : selectedRoute === "PUBLIC" ? (
        <PublicMap
          blogData={blogData}
          blogSelected={blogSelected}
          setBlogSelected={setBlogSelected}
          setSelectedRoute={setSelectedRoute}
        />       
      ) : selectedRoute === "BLOGDETAILS" ? (
        <BlogDetails
          blog={blogSelected}
          comments={commentData}
          bookmarkedBlogs={bookmarkedBlogs}
          userData={userData}
          onBookmarkClick={updateBookmarkedBlogs}
          updateComments ={updateComments}
        />
      ) : selectedRoute === "MUSHROOMS" ? (
        <MushroomList mushrooms={mushroomData} />
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
        />
      ) : selectedRoute === "ACCOUNT" ? (
        <Account users={userData} />
      ) : selectedRoute === "LOGINSIGNUP" ? (
        <LoginSignup setSelectedRoute={setSelectedRoute} setValue={setValue} />
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
        />
      ) : (
        <SearchResults searchTerm={searchTerm} />
      )}
    </div>
  );
}

export default App;
