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

  return router;
};
