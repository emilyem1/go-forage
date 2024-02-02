import BlogListMap from "./BlogListMap";

const FieldJournalItem = (props) => {
  const { blog, setSelectedRoute, setBlogSelected } = props;

  const handleClick = () => {
    setBlogSelected(blog);
    setSelectedRoute("FIELDDETAILS");
  };

  return (
    <section onClick={handleClick} className="mushroom-list__item">
      <div>
        <BlogListMap location={{ lat: blog.lat, lng: blog.long }} />
      </div>
      <div>{blog.title}</div>
      <div>By: {blog.username}</div>
      {blog.mushrooms && blog.mushrooms.length > 0 && (
        <div>
          {blog.mushrooms.map((mushroom, index) => (
            <div key={index}>
              <img
                className="mushroom-list__image"
                src={`images/${mushroom.mushroom_image}`}
                alt={mushroom.mushroom_name}
              />
              <div>{mushroom.mushroom_name}</div>
            </div>
          ))}
          <div className="mushroom-list__details">
            <footer className="mushroom-list__info">
              <div className="mushroom-list__description">{blog.content}</div>
            </footer>
          </div>
        </div>
      )}
    </section>
  );
};

export default FieldJournalItem;