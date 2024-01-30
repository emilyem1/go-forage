import { useState } from "react";

import "../styles/BlogDetails.scss";
import BlogListMap from "./BlogListMap";
import Comments from "./Comments";

const BlogDetails = (props) => {
  const { blog, comments } = props;
  const [newComment, setNewComment] = useState({
    blog_Id: blog.id,
    commenter_Id: 1,
    message: "",
  });

  const handleChange = (event) => {
    const { name: input, value } = event.target;
    setNewComment((prevData) => ({
      ...prevData,
      [input]: value,     
    }));
    console.log("Updated comment", newComment);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newComment.message.trim() === "") {
      // Handle error, e.g., show a message to the user
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

      // Reset the comment box values after submission
      setNewComment({
        blog_Id: blog.id,
        commenter_Id: 1,
        message: "",
      });
    } catch (error) {
      console.error("Error when posting:", error.message);
    }
  };
  return (
    <main>
      <section className="blog-container">
        <div className="map">
          <BlogListMap location={{ lat: blog.lat, lng: blog.long }} />
        </div>
        <header className="blog-header">
          <div className="blog-info">
            <h1>{blog.title}</h1>
            <div>By: {blog.username}</div>
          </div>
          <div className="mushrooms-info">
            <div>{blog.mushroom}</div>
            <img
              className="mushroom-image"
              src={`images/${blog.mushroom_image}`}
              alt={blog.mushroom}
            />
          </div>
        </header>
        <section>
          <p>{blog.content}</p>
        </section>
      </section>
      <section className="comments-container">
        add comment:
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
          {comments.map(
            (comment) =>
              comment.blog_id === blog.id && (
                <p>{<Comments comment={comment} />}</p>
              )
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogDetails;
