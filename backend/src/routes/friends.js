const router = require("express").Router();
const { Client } = require("pg");

module.exports = (db) => {
  router.get("/friends", (request, response) => {
    db.query(
      `
      SELECT
        USER_ID,
        ARRAY_AGG(json_build_object('user_name', USER_ACCOUNT.FULLNAME, 'avatar', USER_ACCOUNT.PHOTO_URL)) AS friends
      FROM
        FRIENDS
      JOIN USER_ACCOUNT ON FRIENDS.FRIEND_USER_ID = USER_ACCOUNT.ID
      GROUP BY USER_ID
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
    const blogId = request.params.id;
    const { title, content, latitude, longitude, user_id, mushrooms, privacy } =
      request.body;
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
        const mushroomValues = mushrooms.map((mushroom) => [
          blogId,
          mushroom.mushroom_id,
        ]);
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
