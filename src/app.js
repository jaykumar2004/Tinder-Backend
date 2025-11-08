const express = require("express");
const app = express();

app.use(
  "/user",
  (res, req, next) => {
    console.log("1st Response!!");
    next();
  },
  (req, res, next) => {
    console.log("2nd Response!!");
    next();
  },
  (req, res, next) => {
    console.log("3nd Response!!");
    next();
  },
  (req, res, next) => {
    console.log("4nd Response!!");
    next();
  },
  (req, res, next) => {
    res.send("5th Response!!");
  }
);

app.listen(3000, () => {
  console.log("Server is litening to the port no. 3000");
});
