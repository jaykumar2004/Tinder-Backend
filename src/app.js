const express = require("express");
const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth.js");

// auth middleware
app.use("/admin", adminAuth);

app.get("/user/login", (req, res) => {
  res.send("User Login Successfully");
});

app.get("/user", userAuth, (req, res) => {
  res.send("User Data");
});

app.get("/admin/data", (req, res) => {
  res.send("Data Fetched");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("User Deleted Successfully");
});

app.listen(3000, () => {
  console.log("Server is litening to the port no. 3000");
});
