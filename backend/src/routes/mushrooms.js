const router = require("express").Router();

module.exports = (db) => {
  router.get("/mushrooms", (request, response) => {
    db.query(
      `
    SELECT
    MUSHROOM.TITLE AS name,
    MUSHROOM.ID AS id,
    MUSHROOM.IMAGE_URL AS image,
    MUSHROOM.INFO AS info,
    MUSHROOM.EDIBLE AS edible
    FROM
      MUSHROOM
    `
    ).then(({ rows: mushrooms }) => {
      response.json(mushrooms);
    });
  });
  return router;
};
