import "../styles/MushroomListItem.scss";
import BlogListMap from "./BlogListMap";

const BlogListItem = (props) => {
  const { blog, setSelectedRoute, setBlogSelected } = props;
  const handleClick = () => {
    setBlogSelected(blog);
    setSelectedRoute("BLOGDETAILS");
  };
  return (
    <section onClick={handleClick} className="mushroom-list__item">
      <div>
        <BlogListMap location={{ lat: blog.lat, lng: blog.long }} />
      </div>
      <div>{blog.title}</div>
      <div>By: {blog.username}</div>
      {blog.mushrooms.map((mushroom, index) => (
        <div key={index}>
          {mushroom.mushroom_name}
          <img
            className="mushroom-list__image"
            src={`images/${mushroom.mushroom_image}`}
            alt={mushroom.mushroom_name}
          />
        </div>
      ))}
      <div className="mushroom-list__details">
        <footer className="mushroom-list__info">
          <div className="mushroom-list__description">{blog.content}</div>
        </footer>
      </div>
    </section>
  );
};

export default BlogListItem;
