import useApplicationData from "./hooks/useApplicationData";
import BlogList from "./components/BlogList";
import Map from "./components/Map";

import "./App.css";

function App() {
  const { state, setBlogSelected } = useApplicationData();
  const { selectedBlog, blogData } = state;

  return (
    <div className="App">
      {/* <BlogList blogs={blogData} /> */}
      <Map/>
    </div>
  );
}

export default App;
