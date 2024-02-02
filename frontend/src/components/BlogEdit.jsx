import React, { useState, useEffect } from "react";
import BlogFormMap from "./BlogFormMap";
import "../styles/BlogForm.scss";

const BlogEdit = (props) => {
  const { mushrooms, setBlogUpdate, existingBlog, setEditMode, setSelectedRoute } = props;
  const [disableAddMushroom, setDisableAddMushroom] = useState(true);

  const [formData, setFormData] = useState({
    title: existingBlog.title || "",
    content: existingBlog.content || "",
    latitude: existingBlog.latitude || 1,
    longitude: existingBlog.longitude || 1,
    user_id: existingBlog.user_id || 1,
    mushrooms: existingBlog.mushrooms || [{}],
  });

  useEffect(() => {
    // Set initial form data when existingBlog changes
    setFormData({
      title: existingBlog.title || "",
      content: existingBlog.content || "",
      latitude: existingBlog.latitude || 1,
      longitude: existingBlog.longitude || 1,
      user_id: existingBlog.user_id || 1,
      mushrooms: existingBlog.mushrooms || [{}],
    });
  }, [existingBlog]);

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
    setDisableAddMushroom(false);
  };

  const handleAddMushroom = () => {
    setFormData((prevData) => ({
      ...prevData,
      mushrooms: [...prevData.mushrooms, { mushroom_id: "" }],
    }));
    setDisableAddMushroom(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const mushroomIds = formData.mushrooms.map((mushroom) => mushroom.mushroom_id);
    try {
      // Put request to update the existing blog
      const blogResponse = await fetch(`http://localhost:8001/api/blogs/${existingBlog.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          latitude: formData.latitude,
          longitude: formData.longitude,
          user_id: formData.user_id,
          mushrooms: mushroomIds,
        }),
      });
  
      if (!blogResponse.ok) {
        throw new Error(`Failed to update blog. Status: ${blogResponse.status}`);
      }
  
      const updatedBlogData = await blogResponse.json();
      console.log("Blog updated:", updatedBlogData);
  
      // Reset the form after submission
      setFormData({
        title: "",
        content: "",
        latitude: null,
        longitude: null,
        user_id: 1,
        mushrooms: [],
      });
  
      setBlogUpdate(true);
      setEditMode(false); // Exit edit mode after submitting
      setSelectedRoute("FIELDJOURNAL");
    } catch (error) {
      console.error("Error when updating:", error.message);
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
  
          <input
            type="text"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter Blog Content"
          />
  
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

export default BlogEdit;