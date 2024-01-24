import "../styles/MushroomListItem.scss";
import Map from "./Map";

const BlogListItem = (props) => {
  const { blog } = props;

  return (
    <section className="mushroom-list__item">
      <div>
        <Map location={{ lat: blog.lat, lng: blog.long }} />
      </div>
      <div>{blog.title}</div>
      <div>By: {blog.username}</div>
      <img
        className="mushroom-list__image"
        src={`images/${blog.mushroom_image}`}
        alt={blog.mushroom}
      />
      <div className="mushroom-list__details">
        <footer className="mushroom-list__info">
          <div>{blog.mushroom}</div>
          <div className="mushroom-list__description">{blog.content}</div>
        </footer>
      </div>
    </section>
  );
};

export default BlogListItem;
