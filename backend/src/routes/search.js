const router = require("express").Router();

module.exports = (db) => {
  router.get("/search", (request, response) => {
    response.json({ message: "This is a basic search route" });
  });

  return router;
};