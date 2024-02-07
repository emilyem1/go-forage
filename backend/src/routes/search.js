const router = require("express").Router();

module.exports = (db) => {
  router.get("/search", async (request, response) => {
    console.log(`Search request for: ${request.query.term}`);
    searchTerm = request.query.term;
    try {
      // Perform separate queries for users, mushrooms, and blogs
      const [userResults, mushroomResults, blogResults] = await Promise.all([
        db.query(`SELECT * FROM USER_ACCOUNT WHERE FULLNAME ILIKE $1`, [
          `%${searchTerm}%`,
        ]),
        db.query(`SELECT * FROM MUSHROOM WHERE TITLE ILIKE $1`, [
          `%${searchTerm}%`,
        ]),
        db.query(
          `
        SELECT
          BLOG.ID AS id,
          BLOG.TITLE AS title,
          USER_ACCOUNT.FULLNAME as username,
          USER_ACCOUNT.PHOTO_URL as avatar,
          BLOG.CONTENT AS content,
          BLOG.PUBLICATION_DATE AS date,
          BLOG.LATITUDE AS lat,
          BLOG.LONGITUDE AS long,
           json_agg(json_build_object(
           'mushroom_name', MUSHROOM.TITLE,
           'mushroom_image', MUSHROOM.IMAGE_URL,
           'mushroom_icon', MUSHROOM.ICON
          )) AS mushrooms
        FROM
          BLOG
          JOIN USER_ACCOUNT ON BLOG.USER_ID = USER_ACCOUNT.ID
          LEFT JOIN MUSHROOM_POST ON BLOG.ID = MUSHROOM_POST.BLOG_ID
          LEFT JOIN MUSHROOM ON MUSHROOM_POST.MUSHROOM_ID = MUSHROOM.ID
        WHERE
          BLOG.TITLE ILIKE $1
          GROUP BY
          BLOG.ID, BLOG.TITLE, USER_ACCOUNT.FULLNAME, USER_ACCOUNT.PHOTO_URL,BLOG.PUBLICATION_DATE,
          BLOG.CONTENT, BLOG.LATITUDE, BLOG.LONGITUDE
        ORDER BY
          BLOG.ID DESC;
    `,
          [`%${searchTerm}%`]
        ),
      ]);

      // Combine results from queries
      const combinedResults = {
        users: userResults,
        mushrooms: mushroomResults,
        blogs: blogResults,
      };
      response.json(combinedResults);
    } catch (error) {
      console.error("Error performing search:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  });
  router.get("/search/mushroomBlogs", async (request, response) => {
    console.log(`Search request for blogs containing mushroom: ${request.query.mushroom}`);

    const searchTerm = `%${request.query.mushroom}%`;

    try {
      const mushroomBlogs = await db.query(`
        SELECT
          BLOG.ID AS id,
          BLOG.TITLE AS title,
          USER_ACCOUNT.FULLNAME as username,
          USER_ACCOUNT.PHOTO_URL as avatar,
          BLOG.CONTENT AS content,
          BLOG.PUBLICATION_DATE AS date,
          BLOG.LATITUDE AS lat,
          BLOG.LONGITUDE AS long,
          json_agg(json_build_object(
            'mushroom_name', MUSHROOM.TITLE,
            'mushroom_image', MUSHROOM.IMAGE_URL,
            'mushroom_icon', MUSHROOM.ICON
          )) AS mushrooms
        FROM
          BLOG
          JOIN USER_ACCOUNT ON BLOG.USER_ID = USER_ACCOUNT.ID
          LEFT JOIN MUSHROOM_POST ON BLOG.ID = MUSHROOM_POST.BLOG_ID
          LEFT JOIN MUSHROOM ON MUSHROOM_POST.MUSHROOM_ID = MUSHROOM.ID
        WHERE
          MUSHROOM.TITLE ILIKE $1
        GROUP BY
          BLOG.ID, BLOG.TITLE, USER_ACCOUNT.FULLNAME, USER_ACCOUNT.PHOTO_URL, BLOG.PUBLICATION_DATE,
          BLOG.CONTENT, BLOG.LATITUDE, BLOG.LONGITUDE
        ORDER BY
          BLOG.ID DESC;
      `, [searchTerm]);

      response.json({ mushroomBlogs });
    } catch (error) {
      console.error("Error performing mushroom-related blog search:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  });
  return router;
};
