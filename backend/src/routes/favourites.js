const router = require("express").Router();

module.exports = (db) => {
  router.get("/favourites/blogs/:user_id", (request, response) => {
    const protocol = request.protocol;
    const host = request.hostname;
    const port = process.env.PORT || 8001;
    const serverUrl = `${protocol}://${host}:${port}`;

    db.query(
      `
    SELECT 
    BLOG.id AS blog_id
    FROM FAVOURITES
    JOIN USER_ACCOUNT ON FAVOURITES.USER_ID = USER_ACCOUNT.id
    JOIN BLOG ON FAVOURITES.BLOG_ID = BLOG.id
    WHERE FAVOURITES.USER_ID = ${request.params.user_id}
    `
    ).then(({ rows: favourite_blogs }) => {
      const blogIds = favourite_blogs.map(blog => blog.blog_id);
    response.json(blogIds);
    });
  });

  router.post("/favourites", async (request, response) => {
    console.log("Received POST request to /favourites");
    const { blog_Id, commenter_Id, message } = request.body;
    db.query(
      `
      INSERT INTO COMMENTS (BLOG_ID, COMMENTER_ID, MESSAGE)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [blog_Id, commenter_Id, message]
    ).then(({ rows }) => {
      response.json(rows[0]);
    });
  });

  return router;
};
