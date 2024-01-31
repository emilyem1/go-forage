import "../styles/MushroomListItem.scss";
import BlogListMap from "./BlogListMap";

const BlogListItem = (props) => {
  const { blog, setSelectedRoute, setBlogSelected } = props;
  const mushrooms = blog.mushrooms.split(",");
  const mushroom_images = blog.mushroom_images.split(",");
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
      {mushrooms.map((mushroom,index) => (
        <div key={index}>{mushroom}
      <img
        className="mushroom-list__image"
        src={`images/${mushroom_images[index].trim()}`}
        alt={mushroom}
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
