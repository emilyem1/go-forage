import { useState, React } from "react";
import useApplicationData from "./hooks/useApplicationData";
import "./App.css";

import BlogList from "./components/BlogList";
import PublicMap from "./components/PublicMap";
import TopNavigation from "./components/TopNavigationBar";
import MushroomList from "./components/MushroomList";
import FieldJournal from "./components/FieldJournal";
import LoginSignup from "./components/LoginSignup";
import BlogDetails from "./components/BlogDetails";

function App() {
  const { state, setSelectedRoute } = useApplicationData();
  const { blogData, selectedRoute, mushroomData } = state;
  const [blogSelected, setBlogSelected] = useState(null);

  return (
    <div className="App">
      <TopNavigation route={setSelectedRoute} />
      {selectedRoute === "PUBLIC" ? (
        <PublicMap
          blogData={blogData}
          blogSelected={blogSelected}
          setBlogSelected={setBlogSelected}
          setSelectedRoute={setSelectedRoute}
        />
      ) : selectedRoute === "BLOGDETAILS" ? (
        <BlogDetails blog={blogSelected} />
      ) : selectedRoute === "BLOGLIST" ? (
        <BlogList blogs={blogData} />
      ) : selectedRoute === "MUSHROOMS" ? (
        <MushroomList mushrooms={mushroomData} />
      ) : selectedRoute === "FIELDJOURNAL" ? (
        <FieldJournal />
      ) : (
        <LoginSignup />
      )}
    </div>
  );
}

export default App;
