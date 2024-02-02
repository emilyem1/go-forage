const router = require("express").Router();

module.exports = (db) => {
  router.get("/favourites", (request, response) => {
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
    ).then(({ rows: favourites }) => {
      // Transform the result to the desired format
      const result = {};
      
      favourites.forEach((favourite) => {
        result[favourite.user_id] = favourite.blog_ids;
      });
  
      response.json(result);
    });
  });

  router.post("/favourites", async (request, response) => {
    console.log("Received POST request to /favourites");
    const { blog_Id, commenter_Id, message } = request.body;
    db.query(
      `
      INSERT INTO COMMENTS (BLOG_ID, COMMENTER_ID, MESSAGE)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [blog_Id, commenter_Id, message]
    ).then(({ rows }) => {
      response.json(rows[0]);
    });
  });

  return router;
};
