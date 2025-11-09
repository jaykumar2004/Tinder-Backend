const express = require("express");
const app = express();

const { authMiddleware } = require("./middlewares/auth.js");

// auth middleware
app.use("/admin", authMiddleware);

app.get("/user", (req, res) => {
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
