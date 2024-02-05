const router = require("express").Router();

module.exports = (db) => {
  router.get("/comments", (request, response) => {
    db.query(
      `
      SELECT
      COMMENTS.ID as id,
      COMMENTS.BLOG_ID as blog_id, 
      COMMENTS.COMMENTER_ID as user_id, 
      COMMENTS.MESSAGE as message,
      USER_ACCOUNT.FULLNAME AS username,
      USER_ACCOUNT.PHOTO_URL AS avatar
      FROM
      COMMENTS    
      JOIN USER_ACCOUNT ON COMMENTS.COMMENTER_ID = USER_ACCOUNT.ID
      ORDER BY
      COMMENTS.ID DESC
      `
    ).then(({ rows: blogs }) => {
      response.json(blogs);
    });
  });

  router.post("/comments", async (request, response) => {
    console.log("Received POST request to /comments");
    const { blog_Id, commenter_Id,message } = request.body;
    db.query(
      `
      INSERT INTO COMMENTS (BLOG_ID, COMMENTER_ID, MESSAGE)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [blog_Id, commenter_Id,message]
    ).then(({ rows }) => {
      response.json(rows[0]);
    });
  });
  return router;
};
