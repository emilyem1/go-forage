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

function App() {
  const { state, setSelectedRoute } = useApplicationData();
  const { blogData, selectedRoute, mushroomData, userData, commentData } = state;
  const [blogSelected, setBlogSelected] = useState(null);
  // Currently selected tab = value
  const [value, setValue] = useState(0);

  return (
    <div className="App">
      <Header route={setSelectedRoute} userData={userData} value = {value} setValue = {setValue} />
      {selectedRoute === "PUBLIC" ? (
        <PublicMap
          blogData={blogData}
          blogSelected={blogSelected}
          setBlogSelected={setBlogSelected}
          setSelectedRoute={setSelectedRoute}
        />
      ) : selectedRoute === "BLOGLIST" ? (
        <BlogList
          blogs={blogData}
          setBlogSelected={setBlogSelected}
          setSelectedRoute={setSelectedRoute}
          mushrooms={mushroomData}
        />
      ) : selectedRoute === "BLOGDETAILS" ? (
        <BlogDetails blog={blogSelected} comments={commentData} />
      ) : selectedRoute === "MUSHROOMS" ? (
        <MushroomList mushrooms={mushroomData} />
      ) : selectedRoute === "FIELDJOURNAL" ? (
        <FieldJournal 
          email={userData.email}
          blogs={blogData}
          setBlogSelected={setBlogSelected}
          setSelectedRoute={setSelectedRoute}
          mushrooms={mushroomData}
        />
      ) : selectedRoute === "ACCOUNT" ?(
          <Account users={userData}/>
      ) : (
        <LoginSignup setSelectedRoute={setSelectedRoute} setValue = {setValue}/>
      )}
    </div>
  );
}

export default App;
