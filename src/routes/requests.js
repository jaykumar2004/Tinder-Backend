const express = require("express");
const { userAuth } = require("../middlewares/auth.js");

const requestRouter = express.Router();

requestRouter.post("/connection", userAuth, async (req, res) => {
  try {
    console.log("Connection Req Sent!");

    res.send("Req sent");
  } catch (err) {
    throw new Error(err.message);
  }
});

module.exports = requestRouter;
