const express = require("express");
const app = express();

// app.use(
//   "/user",
//   (res, req, next) => {
//     console.log("1st Response!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("2nd Response!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("3nd Response!!");
//     next();
//   },
//   (req, res, next) => {
//     console.log("4nd Response!!");
//     next();
//   },
//   (req, res, next) => {
//     res.send("5th Response!!");
//   }
// );

// auth middleware
app.use("/admin", (req, res, next) => {
  // use is for all the http requests (GET, PUT, POST,DELETE)
  console.log("User Auth is Checked");
  const token = "xyz";  // if the token is valid then it will move to the next route
  const authorizedUser = token === "xyz";
  if (!authorizedUser) {
    res.status(401).send("Unauthorized User");
  } else {
    next();
  }
});

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
