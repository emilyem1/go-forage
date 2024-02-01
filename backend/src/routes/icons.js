const router = require("express").Router();

module.exports = (db) => {
  router.get("/icons", (request, response) => {
    const email = request.query.email;
    db.query(
      `
      SELECT DISTINCT MUSHROOM.ICON
      FROM USER_ACCOUNT
      JOIN BLOG ON USER_ACCOUNT.ID = BLOG.USER_ID
      JOIN MUSHROOM_POST ON BLOG.ID = MUSHROOM_POST.BLOG_ID
      JOIN MUSHROOM ON MUSHROOM_POST.MUSHROOM_ID = MUSHROOM.ID
      WHERE USER_ACCOUNT.EMAIL = $1;
    `,
    [email]
    ).then(({ rows: icons }) => {
      response.json(icons);
    });
  });
  return router;
};
