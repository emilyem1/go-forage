import useApplicationData from "./hooks/useApplicationData";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Map from "./components/Map";

import "./App.css";

function App() {
  const { state, setBlogSelected } = useApplicationData();
  const { selectedBlog, blogData } = state;

  return (
    <div className="App">
      <Map/>
      {/* <BlogForm /> */}
      {/* <BlogList blogs={blogData} /> */}
    </div>
  );
}

export default App;
