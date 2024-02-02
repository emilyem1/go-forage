import React, { useState } from "react";
import BlogListMap from "./BlogListMap";
import Comments from "./Comments";
import BlogEdit from "./BlogEdit";

const FieldDetails = (props) => {
  const { blog, comments, mushrooms, setBlogUpdate, setSelectedRoute } = props;
  const [newComment, setNewComment] = useState({
    blog_Id: blog.id,
    commenter_Id: 1,
    message: "",
  });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (event) => {
    const { name: input, value } = event.target;
    setNewComment((prevData) => ({
      ...prevData,
      [input]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newComment.message.trim() === "") {
      console.error("Comment message cannot be empty");
      return;
    }

    try {
      const response = await fetch("http://localhost:8001/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        throw new Error(`Failed to post comment. Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Comment posted:", responseData);

      setNewComment({
        blog_Id: blog.id,
        commenter_Id: 1,
        message: "",
      });
    } catch (error) {
      console.error("Error when posting:", error.message);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  return (
    <main>
      {editMode ? (
        <BlogEdit setEditMode={setEditMode} mushrooms={mushrooms} existingBlog={blog} setBlogUpdate={setBlogUpdate} setSelectedRoute={setSelectedRoute} />
      ) : (
        <section className="blog-container">
          <div className="map">
            <BlogListMap location={{ lat: blog.lat, lng: blog.long }} />
          </div>
          <header className="blog-header">
            <div className="blog-info">
              <h1>{blog.title}</h1>
              <div>By: {blog.username}</div>
            </div>

            {blog.mushrooms.map((mushroom, index) => (
              <div key={index} className="mushrooms-info">
                {mushroom.mushroom_name}
                <img
                  className="mushroom-image"
                  src={`images/${mushroom.mushroom_image}`}
                  alt={mushroom.mushroom_name}
                />
              </div>
            ))}
          </header>
          <section>
            <p>{blog.content}</p>
          </section>
          <section className="comments-container">
            <form>
              <label>
                <input
                  type="text"
                  name="message"
                  value={newComment.message}
                  onChange={handleChange}
                  placeholder="Enter Comment"
                />
              </label>
              <button type="button" onClick={handleSubmit}>
                Submit
              </button>
            </form>
            <div>
              {comments
                .filter((comment) => comment.blog_id === blog.id)
                .map((comment) => (
                  <div key={comment.id}>
                    <Comments comment={comment} />
                  </div>
                ))}
            </div>
            <footer>
              <button type="button" onClick={handleEditClick}>
                Edit
              </button>
            </footer>
          </section>
        </section>
      )}
    </main>
  );
};

export default FieldDetails;