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
        USER_ACCOUNT.PHOTO_URL AS avatar,
        BLOG.PUBLICATION_DATE AS date,
        BLOG.PRIVACY AS privacy,
        json_agg(json_build_object(
          'mushroom_name', MUSHROOM.TITLE,
          'mushroom_image', MUSHROOM.IMAGE_URL,
          'mushroom_icon', MUSHROOM.ICON
      )) AS mushrooms,
        BLOG.CONTENT AS content,
        BLOG.LATITUDE AS lat,
        BLOG.LONGITUDE AS long
      FROM
        BLOG
        JOIN USER_ACCOUNT ON BLOG.USER_ID = USER_ACCOUNT.ID
        LEFT JOIN MUSHROOM_POST ON BLOG.ID = MUSHROOM_POST.BLOG_ID
        LEFT JOIN MUSHROOM ON MUSHROOM_POST.MUSHROOM_ID = MUSHROOM.ID
      WHERE USER_ACCOUNT.EMAIL = $1
      GROUP BY
        BLOG.ID, BLOG.TITLE, USER_ACCOUNT.FULLNAME, USER_ACCOUNT.PHOTO_URL, BLOG.PUBLICATION_DATE,
        BLOG.CONTENT, BLOG.LATITUDE, BLOG.LONGITUDE
      ORDER BY
        BLOG.ID DESC;
    `,
    [email]
    ).then(({ rows: blogs }) => {
      response.json(blogs);
    }).catch(error => {
      console.error('Error executing query:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    });
  });
  return router;
};