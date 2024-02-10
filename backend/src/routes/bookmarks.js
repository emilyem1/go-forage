const router = require("express").Router();

module.exports = (db) => {
  router.get("/bookmarks", (request, response) => {
    db.query(
      `
      SELECT 
        USER_ACCOUNT.ID as user_id,
        ARRAY_AGG(BLOG.id) AS blog_ids
      FROM FAVOURITES
      JOIN USER_ACCOUNT ON FAVOURITES.USER_ID = USER_ACCOUNT.id
      JOIN BLOG ON FAVOURITES.BLOG_ID = BLOG.id
      GROUP BY USER_ACCOUNT.ID
      `
    ).then(({ rows: bookmarks }) => {
      const result = {};
      
      bookmarks.forEach((bookmark) => {
        result[bookmark.user_id] = bookmark.blog_ids;
      });
  
      response.json(result);
    });
  });

  router.post("/bookmarks", async (request, response) => {
    console.log("Received POST request to /bookmarks");
    const { user_id, blog_id } = request.body;
    db.query(
      `
      INSERT INTO FAVOURITES (USER_ID, BLOG_ID)
      VALUES ($1, $2)
      RETURNING *
    `,
      [user_id, blog_id]
    ).then(({ rows }) => {
      response.json(rows[0]);
    });
  });

  router.post("/bookmarks/delete", async (request, response) => {
    console.log("Received POST request to /bookmarks/delete");
    const { user_id, blog_id } = request.body;
    db.query(
      `
      DELETE FROM FAVOURITES
      WHERE USER_ID = $1 AND BLOG_ID = $2
      RETURNING *
    `,
      [user_id, blog_id]
    ).then(({ rows }) => {
      if (rows.length === 0) {
        // No matching entry found
        response.status(404).json({ message: "Entry not found" });
      } else {
        // Entry deleted successfully
        response.json({ message: "Entry deleted successfully" });
      }
    }).catch((error) => {
      console.error("Error when deleting:", error.message);
      response.status(500).json({ message: "Internal Server Error" });
    });
  });

  return router;
};
