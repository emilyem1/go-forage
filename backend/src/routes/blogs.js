const router = require("express").Router();
const { Client } = require("pg");

module.exports = (db) => {
  router.get("/blogs", (request, response) => {
    db.query(
      `
      SELECT
      BLOG.ID AS id,
      BLOG.TITLE AS title,
      USER_ACCOUNT.ID AS user_id,
      USER_ACCOUNT.EMAIL AS user_email,
      USER_ACCOUNT.FULLNAME AS username,
      USER_ACCOUNT.PHOTO_URL AS avatar,
      BLOG.PUBLICATION_DATE AS date,
      BLOG.PRIVACY AS privacy,
      json_agg(json_build_object(
          'mushroom_name', MUSHROOM.TITLE,
          'mushroom_image', MUSHROOM.IMAGE_URL,
          'mushroom_icon', MUSHROOM.ICON
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
      BLOG.ID, BLOG.TITLE, USER_ACCOUNT.ID, USER_ACCOUNT.EMAIL, USER_ACCOUNT.FULLNAME, USER_ACCOUNT.PHOTO_URL,BLOG.PUBLICATION_DATE,
      BLOG.CONTENT, BLOG.LATITUDE, BLOG.LONGITUDE
      ORDER BY
      BLOG.ID DESC
      `
    ).then(({ rows: blogs }) => {
      response.json(blogs);
    });
  });

  router.post("/blogs", async (request, response) => {
    console.log("Received POST request to /blogs");
    const { title, content, latitude, longitude, user_id, privacy } =
      request.body;
    db.query(
      `
      INSERT INTO BLOG (TITLE, CONTENT, LATITUDE, LONGITUDE, USER_ID, PRIVACY)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `,
      [title, content, latitude, longitude, user_id, privacy]
    ).then(({ rows }) => {
      response.json(rows[0]);
    });
  });

  router.post("/mushroom-posts", async (request, response) => {
    console.log("Received POST request to /mushroom-posts");
    const { blog_id, mushroom_id } = request.body;
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
    console.log("Request Body:", request.body);
    const blogId = request.params.id;
    const { title, content, latitude, longitude, user_id, mushrooms, privacy } = request.body;
    console.log("Received data:", {
      title,
      content,
      latitude,
      longitude,
      user_id,
      mushrooms,
      privacy,
    });
    const client = new Client();
    try {
      await client.connect();
      await client.query("BEGIN");
      const updateBlogResponse = await client.query(
        `
        UPDATE BLOG
        SET TITLE = $1, CONTENT = $2, LATITUDE = $3, LONGITUDE = $4, USER_ID = $5, PRIVACY = $6
        WHERE ID = $7
        RETURNING *
      `,
        [title, content, latitude, longitude, user_id, privacy, blogId]
      );
      console.log("Update response:", updateBlogResponse.rows);
      if (updateBlogResponse.rows.length === 0) {
        response.status(404).json({ error: "Blog not found" });
        return;
      }
      // Delete old mushrooms
      await client.query("DELETE FROM MUSHROOM_POST WHERE BLOG_ID = $1", [
        blogId,
      ]);
      console.log("Deleted old mushrooms");
      // Insert new mushrooms
      if (mushrooms && mushrooms.length > 0) {
        const mushroomValues = mushrooms.map(mushroomId => [blogId, mushroomId]);
        const placeholders = mushroomValues
          .map((_, index) => `($${2 * index + 1}, $${2 * index + 2})`)
          .join(", ");
        const insertQuery = `INSERT INTO MUSHROOM_POST (BLOG_ID, MUSHROOM_ID) VALUES ${placeholders}`;
        await client.query(insertQuery, mushroomValues.flat());
        console.log("Inserted new mushrooms:", mushroomValues);
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
  
  router.delete("/blogs/:id", async (request, response) => {
    console.log("Received DELETE request to /blogs/:id");
    const blogId = request.params.id;
    try {
      const deleteBlogResponse = await db.query(
        "DELETE FROM BLOG WHERE ID = $1 RETURNING *",
        [blogId]
      );

      if (deleteBlogResponse.rows.length === 0) {
        response.status(404).json({ error: "Blog not found" });
        return;
      }
      response.json({ message: `Blog with ID ${blogId} deleted successfully` });
    } catch (error) {
      console.error("Error when deleting blog:", error.message);
      response.status(500).json({ error: "Internal Server Error" });
    }
  });

  return router;
};
