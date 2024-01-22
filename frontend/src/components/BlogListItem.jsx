

const BlogListItem = (props) => {
  const { blog } = props;

  return (
    <section >
      <div >MAP AT LAT:{blog.lat}, LONG:{blog.long}</div>
      <div >{blog.title}</div>
      <div >By: {blog.username}</div>
      <img src={`images/${blog.mushroom_image}`} alt={blog.mushroom} />
      <div >
        <footer >
          <div >{blog.mushroom}</div>
          <div >
            {blog.content} 
          </div>
        </footer>
      </div>
    </section>
  )
};

export default BlogListItem;
