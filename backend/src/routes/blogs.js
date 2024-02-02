const router = require("express").Router();
const { Client } = require('pg');

module.exports = (db) => {
  router.get("/blogs", (request, response) => {
    db.query(
      `
      SELECT
      BLOG.ID AS id,
      BLOG.TITLE AS title,
      USER_ACCOUNT.FULLNAME AS username,
      BLOG.PUBLICATION_DATE AS date,
      json_agg(json_build_object(
          'mushroom_name', MUSHROOM.TITLE,
          'mushroom_image', MUSHROOM.IMAGE_URL
      )) AS mushrooms,
      BLOG.CONTENT AS content,
      BLOG.LATITUDE AS lat,
      BLOG.LONGITUDE AS long
  FROM
      BLOG
  JOIN USER_ACCOUNT ON BLOG.USER_ID = USER_ACCOUNT.ID
  LEFT JOIN MUSHROOM_POST ON BLOG.ID = MUSHROOM_POST.BLOG_ID
  LEFT JOIN MUSHROOM ON MUSHROOM_POST.MUSHROOM_ID = MUSHROOM.ID
  GROUP BY
      BLOG.ID, BLOG.TITLE, USER_ACCOUNT.FULLNAME, BLOG.PUBLICATION_DATE,
      BLOG.CONTENT, BLOG.LATITUDE, BLOG.LONGITUDE
    `
    ).then(({ rows: blogs }) => {
      response.json(blogs);
    });
  });

  router.post("/blogs", async (request, response) => {
    console.log("Received POST request to /blogs");
    const { title, content, latitude, longitude, user_id} = request.body;
    db.query(
      `
      INSERT INTO BLOG (TITLE, CONTENT, LATITUDE, LONGITUDE, USER_ID)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
      [title, content, latitude, longitude, user_id]
    ).then(({ rows }) => {
      response.json(rows[0]);
    });
  });

  router.post("/mushroom-posts", async (request, response) => {
    console.log("Received POST request to /mushroom-posts");
    const { blog_id, mushroom_id} = request.body;
    db.query(
      `
      INSERT INTO MUSHROOM_POST (BLOG_ID, MUSHROOM_ID)
      VALUES ($1, $2)
      RETURNING *
    `,
      [blog_id, mushroom_id]
    ).then(({ rows }) => {
      response.json(rows[0]);
    });
  });

  router.put("/blogs/:id", async (request, response) => {
    console.log("Received PUT request to /blogs/:id");
    const blogId = request.params.id;
    const { title, content, latitude, longitude, user_id, mushrooms } = request.body;
  
    const client = new Client();
    try {
      await client.connect();
      await client.query("BEGIN");
      const updateBlogResponse = await client.query(
        `
        UPDATE BLOG
        SET TITLE = $1, CONTENT = $2, LATITUDE = $3, LONGITUDE = $4, USER_ID = $5
        WHERE ID = $6
        RETURNING *
      `,
        [title, content, latitude, longitude, user_id, blogId]
      );
  
      if (updateBlogResponse.rows.length === 0) {
        response.status(404).json({ error: "Blog not found" });
        return;
      }
      // Delete old mushrooms
      await client.query("DELETE FROM MUSHROOM_POST WHERE BLOG_ID = $1", [blogId]);
  
      // Insert new mushrooms
      if (mushrooms && mushrooms.length > 0) {
        const mushroomValues = mushrooms.map((mushroomId) => [blogId, mushroomId]);
        console.log("mushroomValues:", mushroomValues);
        // placeholders = so you can insert more then 1 mushroom
        const placeholders = mushroomValues.map((_, index) => `($${2 * index + 1}, $${2 * index + 2})`).join(', ');
        const insertQuery = `INSERT INTO MUSHROOM_POST (BLOG_ID, MUSHROOM_ID) VALUES ${placeholders}`;
        await client.query(insertQuery, mushroomValues.flat());
      }
  
      await client.query("COMMIT");
      response.json(updateBlogResponse.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error when updating blog:", error.message);
      response.status(500).json({ error: "Internal Server Error" });
    } finally {
      await client.end();
    }
  });
  return router;
};
