const router = require("express").Router();

module.exports = (db) => {
  router.get("/users", (request, response) => {
    db.query(
      `
      SELECT 
      *
      FROM USER_ACCOUNT
    `
    ).then(({ rows: users }) => {
      response.json(users);
    });
  });

  router.post("/users", async (request, response) => {
    console.log("Received POST request to /users");
    const { email, password, fullname, profilePhoto, action } = request.body;
    console.log("Received data:", {
      email,
      password,
      fullname,
      profilePhoto,
      action,
    });

    if (action === "login") {
      // Login logic
      // Check user credentials in the database
      db.query(
        `
        SELECT * FROM USER_ACCOUNT WHERE EMAIL = $1;
        `,
        [email]
      ).then(({ rows }) => {
        // response.json(rows[0]);
        if (rows.length > 0) {
          // User found
          console.log(rows[0]);
        } else {
          // User not found, send an appropriate response
          console.log("User Not Found");
          response.status(404).json({ error: "User not found" });
        }
      });
    } else if (action === "signup") {
      // Signup logic
      // Create a new user in the database
      db.query(
        `
        INSERT INTO USER_ACCOUNT (FULLNAME, EMAIL, PASSWORD, PHOTO_URL)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
        [fullname, email, password, profilePhoto]
      ).then(({ rows }) => {
        response.json(rows[0]);
      });
    } else {
      response.status(400).json({ error: "Invalid action" });
    }
  });

  return router;
};
