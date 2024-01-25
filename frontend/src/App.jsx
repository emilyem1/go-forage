import useApplicationData from "./hooks/useApplicationData";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import PublicMap from "./components/PublicMap";

import "./App.css";
import TopNavigation from "./components/TopNavigationBar";

function App() {
  const { state, setBlogSelected, setSelectedRoute } = useApplicationData();
  const { selectedBlog, blogData, selectedRoute } = state;

  return (
    <div className="App">
      <TopNavigation 
        route={setSelectedRoute}
      />
      {selectedRoute === "PUBLIC" ? (
        <PublicMap blogData={blogData} /> // Pass updateMapConfig as a prop
      ) : (
        <BlogList blogs={blogData} />
      )}
    </div>
  );
}

export default App;
