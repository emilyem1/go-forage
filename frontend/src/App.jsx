import useApplicationData from "./hooks/useApplicationData";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import PublicMap from "./components/PublicMap";
import Map from "./components/Map";

import "./App.css";

function App() {
  const { state, setBlogSelected, setSelectedRoute } = useApplicationData();
  const { selectedBlog, blogData, selectedRoute } = state;

  return (
    <div className="App">
      <Map/>
      <BlogForm />
      <div>
        <button
          onClick={() => {
            setSelectedRoute("PUBLIC");
          }}
        >
          Public Map
        </button>
        <button
          onClick={() => {
            setSelectedRoute("BLOGLIST");
          }}
        >
          Home Feed
        </button>
      </div>
      {selectedRoute === "PUBLIC" ? (
        <PublicMap blogData={blogData} /> // Pass updateMapConfig as a prop
      ) : (
        <BlogList blogs={blogData} />
      )}
    </div>
  );
}

export default App;
