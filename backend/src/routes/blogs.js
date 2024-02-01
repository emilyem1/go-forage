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
      json_agg(json_build_object(
          'mushroom_name', MUSHROOM.TITLE,
          'mushroom_image', MUSHROOM.IMAGE_URL
      )) AS mushrooms,
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
    const { title, content, latitude, longitude, user_id} = request.body;
    db.query(
      `
      INSERT INTO BLOG (TITLE, CONTENT, LATITUDE, LONGITUDE, USER_ID)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
      [title, content, latitude, longitude, user_id]
    ).then(({ rows }) => {
      response.json(rows[0]);
    });
  });

  router.post("/mushroom-posts", async (request, response) => {
    console.log("Received POST request to /mushroom-posts");
    const { blog_id, mushroom_id} = request.body;
    db.query(
      `
      INSERT INTO MUSHROOM_POST (BLOG_ID, MUSHROOM_ID)
      VALUES ($1, $2)
      RETURNING *
    `,
      [blog_id, mushroom_id]
    ).then(({ rows }) => {
      response.json(rows[0]);
    });
  });

  return router;
};
