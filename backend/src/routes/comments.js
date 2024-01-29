const router = require("express").Router();

module.exports = (db) => {
  router.get("/comments", (request, response) => {
    db.query(
      `
      SELECT
      COMMENTS.ID as id,
      COMMENTS.BLOG_ID as blog_id, 
      COMMENTS.COMMENTER_ID as user_id, 
      COMMENTS.MESSAGE as message
      FROM
      COMMENTS    
    `
    ).then(({ rows: blogs }) => {
      response.json(blogs);
    });
  });

  router.post("/comments", async (request, response) => {
    console.log("Received POST request to /comments");
    const { blogId, userId,content } = request.body;
    db.query(
      `
      INSERT INTO COMMENTS (BLOG_ID, COMMENTER_ID, MESSAGE)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [blogId, userId,content]
    ).then(({ rows }) => {
      response.json(rows[0]);
    });
  });
  return router;
};
