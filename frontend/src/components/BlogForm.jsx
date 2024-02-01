import BlogFormMap from "./BlogFormMap";
import "../styles/BlogForm.scss";
import { useState } from "react";

const BlogForm = (props) => {
  const { mushrooms, setBlogUpdate } = props;
  const [disableAddMushroom, setDisableAddMushroom] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    latitude: 1,
    longitude: 1,
    user_id: 1,
    mushrooms: [{}],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMushroomSelection = (event, index) => {
    const selectedMushroomId = event.target.value;
    setFormData((prevData) => {
      const updatedMushrooms = [...prevData.mushrooms];
      updatedMushrooms[index] = { mushroom_id: selectedMushroomId };
      return {
        ...prevData,
        mushrooms: updatedMushrooms,
      };
    });
    setDisableAddMushroom(false)
  };

  const handleAddMushroom = () => {
    setFormData((prevData) => ({
      ...prevData,
      mushrooms: [...prevData.mushrooms, { mushroom_id: "" }],
    }));
    setDisableAddMushroom(true)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //post to blog api
      const blogResponse = await fetch("http://localhost:8001/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          latitude: formData.latitude,
          longitude: formData.longitude,
          user_id: formData.user_id,
        }),
      });

      if (!blogResponse.ok) {
        throw new Error(`Failed to post blog. Status: ${blogResponse.status}`);
      }

      const blogData = await blogResponse.json();
      console.log("Blog posted:", blogData);

      // post to MUSHROOM_POST api for each selected mushroom
      for (const mushroom of formData.mushrooms) {
        const mushroomPostResponse = await fetch(
          "http://localhost:8001/api/mushroom-posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              blog_id: blogData.id,
              mushroom_id: mushroom.mushroom_id,
            }),
          }
        );

        if (!mushroomPostResponse.ok) {
          throw new Error(
            `Failed to post mushroom post. Status: ${mushroomPostResponse.status}`
          );
        }

        const mushroomPostData = await mushroomPostResponse.json();
        console.log("Mushroom post created:", mushroomPostData);
      }
      setBlogUpdate(true);
      // Reset the form after submission
      setFormData({
        title: "",
        content: "",
        latitude: null,
        longitude: null,
        user_id: "1",
        mushrooms: [],
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

          {formData.mushrooms.map((mushroom, index) => (
            <div key={index}>
              <select
                name={`mushroom_id_${index}`}
                value={mushroom.mushroom_id}
                onChange={(event) => handleMushroomSelection(event, index)}
              >
                <option value="">Select Mushroom</option>
                {mushrooms.map((mushroomOption) => (
                  <option key={mushroomOption.id} value={mushroomOption.id}>
                    {mushroomOption.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
          {formData.mushrooms.length < 4 && (
            <button type="button" onClick={handleAddMushroom} disabled={disableAddMushroom}>
              Add Mushroom
            </button>
          )}

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
      <button type="button" onClick={handleSubmit} >
        Submit
      </button>
    </form>
  );
};

export default BlogForm;
