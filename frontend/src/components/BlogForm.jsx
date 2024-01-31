import BlogFormMap from "./BlogFormMap";
import "../styles/BlogForm.scss";
import { useState } from "react";

const BlogForm = (props) => {
  const { mushrooms } = props;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    latitude: 1,
    longitude: 1,
    user_id: 1,
    mushroom_id: 1,
  });

  const handleChange = (event) => {
    const { name: input, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [input]: value,
    }));
    console.log("Updated blog data:", formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit has been called");

    try {
      const response = await fetch("http://localhost:8001/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to post blog. Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Blog posted:", responseData);

      // Reset the form after submission
      setFormData({
        title: "",
        content: "",
        latitude: null,
        longitude: null,
        user_id: "1",
        mushroom_id: 1,
      });
    } catch (error) {
      console.error("Error when posting:", error.message);
    }
  };

  return (
    <form className="blog-form">
      <div className="form-content">
        <section className="form-input">
          <label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Blog Title"
            />
          </label>

          <button type="button" onClick={()=><select
              name="mushroom_id"
              value={formData.mushroom_id}
              onChange={handleChange}
            >
              <option value="">Select Mushroom</option>
              {mushrooms.map((mushroom) => (
                <option key={mushroom.id} value={mushroom.id}>
                  {mushroom.name}
                </option>
              ))}
            </select>}>
            Add Mushroom
          </button>
          <br />

          <input
            type="text"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter Blog Content"
          />
        </section>
        <section className="map">
          <BlogFormMap setFormData={setFormData} />
        </section>
      </div>
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default BlogForm;
