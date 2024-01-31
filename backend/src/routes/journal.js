const router = require("express").Router();

module.exports = (db) => {
  router.get("/journal", (request, response) => {
    const email = request.query.email;
    console.log('Executing SQL query:', email);
    db.query(
      `
      SELECT
      BLOG.ID AS id,
      BLOG.TITLE AS title,
      USER_ACCOUNT.FULLNAME AS username,
      BLOG.PUBLICATION_DATE AS date,
      MUSHROOM.IMAGE_URL AS mushroom_image,
      MUSHROOM.TITLE AS mushroom,
      BLOG.CONTENT AS content,
      BLOG.LATITUDE AS lat,
      BLOG.LONGITUDE AS long
      FROM
        BLOG
      JOIN USER_ACCOUNT ON BLOG.USER_ID = USER_ACCOUNT.ID
      JOIN MUSHROOM ON BLOG.MUSHROOM_ID = MUSHROOM.ID
      WHERE USER_ACCOUNT.EMAIL = $1;
    `,
    [email]
    ).then(({ rows: blogs }) => {
      response.json(blogs);
    });
  });
  return router;
};
