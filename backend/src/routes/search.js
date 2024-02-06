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
        db.query(`
        SELECT
    BLOG.ID AS id,
    BLOG.TITLE AS title,
    BLOG.CONTENT AS content,
    BLOG.PUBLICATION_DATE AS date,
    BLOG.LATITUDE AS latitude,
    BLOG.LONGITUDE AS longitude,
    json_agg(json_build_object(
        'mushroom_name', MUSHROOM.TITLE,
        'mushroom_image', MUSHROOM.IMAGE_URL,
        'mushroom_icon', MUSHROOM.ICON
    )) AS mushrooms
    FROM
    BLOG
    LEFT JOIN MUSHROOM_POST ON BLOG.ID = MUSHROOM_POST.BLOG_ID
    LEFT JOIN MUSHROOM ON MUSHROOM_POST.MUSHROOM_ID = MUSHROOM.ID
    WHERE
    BLOG.TITLE ILIKE $1
    GROUP BY
    BLOG.ID, BLOG.TITLE, BLOG.CONTENT, BLOG.PUBLICATION_DATE, BLOG.LATITUDE, BLOG.LONGITUDE
    ORDER BY
    BLOG.ID DESC;
    `, [`%${searchTerm}%`]),
      ]);

      // Combine results from queries
      const combinedResults = {
        users: userResults,
        mushrooms : mushroomResults,
        blogs: blogResults,
      };
      response.json(combinedResults);
    } catch (error) {
      console.error("Error performing search:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  });

  return router;
};