const router = require("express").Router();
const { Client } = require("pg");

module.exports = (db) => {
  router.get("/friends", (request, response) => {
    db.query(
      `
      SELECT 
        FRIENDS.USER_ID as user_id,
        ARRAY_AGG(
          json_build_object(
            'id', USER_ACCOUNT.ID, 
            'name', USER_ACCOUNT.FULLNAME, 
            'avatar', USER_ACCOUNT.PHOTO_URL,
            'email', USER_ACCOUNT.EMAIL
          )
        ) AS friend
      FROM FRIENDS
      JOIN USER_ACCOUNT ON FRIENDS.FRIEND_USER_ID = USER_ACCOUNT.id
      GROUP BY user_id
      `
    ).then(({ rows: friends }) => {
      const result = {};

      friends.forEach((friend) => {
        result[friend.user_id] = friend.friend;
      });

      response.json(result);
    });
  });

  router.post("/friends", async (request, response) => {
    console.log("Received POST request to /friends");
    const { user_id, FRIEND_USER_ID } = request.body;
    db.query(
      `
      INSERT INTO FRIENDS (USER_ID, FRIEND_USER_ID)
      VALUES ($1, $2)
      RETURNING *
    `,
      [user_id, FRIEND_USER_ID]
    ).then(({ rows }) => {
      response.json(rows[0]);
    });
  });

  router.post("/friends/delete", async (request, response) => {
    console.log("Received POST request to /friends/delete");
    const { user_id, FRIEND_USER_ID } = request.body;
    db.query(
      `
      DELETE FROM FRIENDS
      WHERE USER_ID = $1 AND FRIEND_USER_ID = $2
      RETURNING *
    `,
      [user_id, FRIEND_USER_ID]
    )
      .then(({ rows }) => {
        if (rows.length === 0) {
          // No matching entry found
          response.status(404).json({ message: "Friend not found" });
        } else {
          // Entry deleted successfully
          response.json({ message: "Friend deleted successfully" });
        }
      })
      .catch((error) => {
        console.error("Error when deleting:", error.message);
        response.status(500).json({ message: "Internal Server Error" });
      });
  });

  return router;
};
