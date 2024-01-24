import BlogListItem from "./BlogListItem";
import "../styles/MushroomList.scss";
import { useState } from 'react';

const BlogList = (props) => {
  const { blogs } = props;
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    latitude: '',
    longitude: '',
    user_id: '',
    mushroom_id: ''
  });

  const handleChange = (event) => {
    const { name: input, value } = event.target;
    setBlogData((prevData) => ({
      ...prevData,
      [input]: value
    }));
    console.log('Updated blog data:', blogData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('handleSubmit has been called')
    try {
      // Fetch the BACKEND lh:
      const response = await fetch('http://localhost:8001/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
      if (!response.ok) {
        throw new Error(`Failed to post blog. Status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log('Blog posted:', responseData);
      // Reset the form after submission
      setBlogData({
        title: '',
        content: '',
        latitude: '',
        longitude: '',
        user_id: '',
        mushroom_id: ''
      });
    } catch (error) {
      console.error('Error when posting:', error.message);
    }
  };
  

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label>Title:
          <input type="text" name="title" value={blogData.title} onChange={handleChange} />
        </label>
        <label>User ID (Put in 1-10):
          <input type="text" name="user_id" value={blogData.user_id} onChange={handleChange} />
        </label>
        <label>Latitude:
          <input type="text" name="latitude" value={blogData.latitude} onChange={handleChange} />
        </label>
        <label>Longitude:
          <input type="text" name="longitude" value={blogData.longitude} onChange={handleChange} />
        </label>
        <label>Mushroom (Put in 1-10):
          <input type="text" name="mushroom_id" value={blogData.mushroom_id} onChange={handleChange} />
        </label>
        <label>Content:
          <input type="text" name="content" value={blogData.content} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <ul className="mushroom-list">
        {blogs.map((blog) => (
          <BlogListItem
            className='mushroom-list'
            key={blog.id}
            blog={blog}
          />
        ))}
      </ul>
    </main>
  );
};

export default BlogList;
