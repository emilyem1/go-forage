import useApplicationData from "./hooks/useApplicationData";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import PublicMap from "./components/PublicMap";

import "./App.css";
import TopNavigation from "./components/TopNavigationBar";
import MushroomList from "./components/MushroomList";

function App() {
  const { state, setBlogSelected, setSelectedRoute } = useApplicationData();
  const { selectedBlog, blogData, selectedRoute, mushroomData } = state;

  return (
    <div className="App">
      <TopNavigation 
        route={setSelectedRoute}
      />
      {selectedRoute === "PUBLIC" ? (
        <PublicMap blogData={blogData} />
      ) : selectedRoute === "BLOGLIST" ? (
        <BlogList blogs={blogData} />
      ) : (
        <MushroomList mushrooms={mushroomData} />
      )}
    </div>
  );
}

export default App;
