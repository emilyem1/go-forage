const router = require("express").Router();

module.exports = (db) => {
  router.get("/search", async (request, response) => {
    console.log(`Search request for: ${request.query.term}`)
    searchTerm = request.query.term
    try {
      // Perform separate queries for users, mushrooms, and blogs
      const [userResults, mushroomResults, blogResults] = await Promise.all([
        db.query(`SELECT * FROM USER_ACCOUNT WHERE FULLNAME ILIKE $1`, [`%${searchTerm}%`]),
        db.query(`SELECT * FROM MUSHROOM WHERE TITLE ILIKE $1`, [`%${searchTerm}%`]),
        db.query(`SELECT * FROM BLOG WHERE TITLE ILIKE $1`, [`%${searchTerm}%`]),
      ]);

      // Combine results from queries
      const combinedResults = {
        users: userResults,
        mushrooms : mushroomResults,
        blogs: blogResults,
      };
      console.log(combinedResults);
      response.json(combinedResults);
    } catch (error) {
      console.error("Error performing search:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  });

  return router;
};