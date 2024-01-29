const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

// Creating an Express application
const app = express();
// Importing the database connection module
const db = require("./db");

// Importing route modules
const blogs = require("./routes/blogs");
const users = require("./routes/users");
const mushrooms = require("./routes/mushrooms");
const comments = require("./routes/comments");

function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8",
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

module.exports = function application() {
  app.use(cors());
  // Middleware to parse JSON in the request body
  app.use(bodyparser.json());
  // Middleware to serve static image files from the 'public' directory
  app.use(express.static(path.join(__dirname, "public")));

  // Mounting route handlers for different resources
  app.use("/api", users(db));
  app.use("/api", mushrooms(db));
  app.use("/api", blogs(db));
  app.use("/api", comments(db));
  
  // Reading SQL files for database schema creation and seeding
  Promise.all([
    read(path.resolve(__dirname, `db/schema/create.sql`)),
    read(path.resolve(__dirname, `db/schema/seed.sql`)),
  ])
    .then(([create, seed]) => {
      app.get("/api/debug/reset", (request, response) => {
        db.query(create)
          .then(() => db.query(seed))
          .then(() => {
            console.log("Database Reset");
            response.status(200).send("Database Reset");
          });
      });
    })
    .catch((error) => {
      console.log(`Error setting up the reset route: ${error}`);
    });
  //close database connection
  app.close = function () {
    return db.end();
  };

  return app;
};
