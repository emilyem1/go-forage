import BlogListMap from "./BlogListMap";

const FieldJournalItem = (props) => {
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

export default FieldJournalItem;