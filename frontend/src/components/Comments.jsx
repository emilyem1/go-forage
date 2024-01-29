import "../styles/Comments.scss";

const Comments = (props) => {
  const { comment } = props;
  return (
    <main>
      <section className="comments-container">
        <div>{comment.username}</div>
        {comment.message}
      </section>
    </main>
  );
};

export default Comments;
