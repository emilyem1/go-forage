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
      USER_ACCOUNT.id AS user_id,
      USER_ACCOUNT.FULLNAME AS username,
      json_agg(
        jsonb_build_object(
          'blog_id', BLOG.id,
          'blog_title', BLOG.TITLE,
          'blog_publication_date', BLOG.publication_date,
          'blog_latitude', BLOG.latitude,
          'blog_longitude', BLOG.longitude,
          'blog_author_id', BLOG.USER_ID
        )
      ) AS fav_blogs
    FROM FAVOURITES
    JOIN USER_ACCOUNT ON FAVOURITES.USER_ID = USER_ACCOUNT.id
    JOIN BLOG ON FAVOURITES.BLOG_ID = BLOG.id
    WHERE FAVOURITES.USER_ID = ${request.params.user_id}
    GROUP BY USER_ACCOUNT.id
    `
    ).then(({ rows: favourite_blogs }) => {
      response.json(favourite_blogs);
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
