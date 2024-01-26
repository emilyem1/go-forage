import useApplicationData from "./hooks/useApplicationData";
import BlogList from "./components/BlogList";
import PublicMap from "./components/PublicMap";
import BlogFormMap from "./components/BlogFormMap";

import "./App.css";
import TopNavigation from "./components/TopNavigationBar";
import MushroomList from "./components/MushroomList";
import FieldJournal from "./components/FieldJournal";
import LoginSignup from "./components/LoginSignup";

function App() {
  const { state, setBlogSelected, setSelectedRoute } = useApplicationData();
  const { selectedBlog, blogData, selectedRoute, mushroomData } = state;

  return (
    <div className="App">
      <TopNavigation route={setSelectedRoute} />
      {selectedRoute === "PUBLIC" ? (
        <PublicMap blogData={blogData} />
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
