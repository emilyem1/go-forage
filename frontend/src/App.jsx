import useApplicationData from "./hooks/useApplicationData";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Map from "./components/Map";

import "./App.css";

function App() {
  const { state, setBlogSelected, setMapConfig } = useApplicationData();
  const { selectedBlog, blogData, mapConfig } = state;
  const { mode } = mapConfig;

  const updateMapConfig = () => {
    setMapConfig({
      mode: "BLOGLIST",
      mapContainerStyle: {
        ...mapConfig.mapContainerStyle,
        height: "60vh",
      },
      options: {
        ...mapConfig.options,
        draggable: false,
      },
    });
  };

  return (
    <div className="App">
      {mode === "PUBLIC" ? <Map /> : <BlogList blogs={blogData} />}

      {/* <BlogForm /> */}
    </div>
  );
}

export default App;
