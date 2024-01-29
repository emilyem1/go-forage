import "../styles/BlogDetails.scss";

const Comments = (props) => {
  const { comment } = props;
  return (
    <main>
      <section className="blog-container">
        {comment.message}
      </section>
    </main>
  );
};

export default Comments;
