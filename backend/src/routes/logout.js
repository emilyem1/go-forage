const express = require("express");
const router = require("express").Router();

module.exports = (db) => {
  router.post("/logout", async (request, response) => {
    console.log("Received POST request to /logout");
    response.clearCookie("user_id");
    response.clearCookie("email");
    response.clearCookie("fullname");
    response.clearCookie("profilePhoto");
    response.clearCookie("isLoggedIn");
    response
      .status(200)
      .json({ success: true, message: "Logout successful", redirect: "/" });
  });

  return router;
};
