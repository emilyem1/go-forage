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
    const { email, password, fullname, action } = request.body;
    console.log("Received data:", { email, password, fullname, action });

    if (action === "login") {
      // Login logic
      // Check user credentials in the database
      response.json({ message: "Login logic to be implemented" });
    } else if (action === "signup") {
      // Signup logic
      // Create a new user in the database
      response.json({ message: "Signup logic to be implemented" });
    } else {
      response.status(400).json({ error: "Invalid action" });
    }
  });

  return router;
};
