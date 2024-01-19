const router = require("express").Router();

module.exports = db => {
  router.get("/users", (request, response) => {
    db.query(`
      SELECT 
      *
      FROM USER_ACCOUNT
    `).then(({ rows: users }) => {
      response.json(users);
    });
  });
  return router;
};
