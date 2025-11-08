const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send("User : Jay");
});

app.use("/test", (req, res) => {
  res.send("Test Route");
});

app.post("/newuser",(req,res)=>{
  res.send("Hello")
})


// app.use("/userData",(req,res)=>(
//     res.send("User Data")
// ))

// app.use("/", (req, res) => {
//   res.send("home page");
// });

app.listen(3000, () => {
  console.log("App is listening on the port 3000");
});
