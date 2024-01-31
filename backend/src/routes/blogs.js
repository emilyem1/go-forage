const router = require("express").Router();

module.exports = (db) => {
  router.get("/blogs", (request, response) => {
    db.query(
      `
      SELECT
      BLOG.ID AS id,
      BLOG.TITLE AS title,
      USER_ACCOUNT.FULLNAME AS username,
      BLOG.PUBLICATION_DATE AS date,
      STRING_AGG(MUSHROOM.IMAGE_URL, ', ') AS mushroom_images,
      STRING_AGG(MUSHROOM.TITLE, ', ') AS mushrooms,
      BLOG.CONTENT AS content,
      BLOG.LATITUDE AS lat,
      BLOG.LONGITUDE AS long
    FROM
      BLOG
      JOIN USER_ACCOUNT ON BLOG.USER_ID = USER_ACCOUNT.ID
      LEFT JOIN MUSHROOM_POST ON BLOG.ID = MUSHROOM_POST.BLOG_ID
      LEFT JOIN MUSHROOM ON MUSHROOM_POST.MUSHROOM_ID = MUSHROOM.ID
    GROUP BY
      BLOG.ID, BLOG.TITLE, USER_ACCOUNT.FULLNAME, BLOG.PUBLICATION_DATE,
      BLOG.CONTENT, BLOG.LATITUDE, BLOG.LONGITUDE
    `
    ).then(({ rows: blogs }) => {
      response.json(blogs);
    });
  });

  router.post("/blogs", async (request, response) => {
    console.log("Received POST request to /blogs");
    const { title, content, latitude, longitude, user_id, mushroom_id } = request.body;
    db.query(
      `
      INSERT INTO BLOG (TITLE, CONTENT, LATITUDE, LONGITUDE, USER_ID, MUSHROOM_ID)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `,
      [title, content, latitude, longitude, user_id, mushroom_id]
    ).then(({ rows }) => {
      response.json(rows[0]);
    });
  });
  return router;
};
