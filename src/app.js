const express = require("express");
const connectDb = require("./config/database.js");
const User = require("./models/user.js");
const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    //creating a new instance of the user model
    firstName: "Jay Kumar",
    lastName: "Jangid",
    emailId: "jay@gmail.com",
    password: "Jaykumar@2004",
    age: 21,
    gender: "Male",
  });
  try {
    await user.save();
    res.send("User Added");
  } catch (err) {
    res.status(400).send("User Not Found");
  }
});

connectDb()
  .then(() => {
    console.log("Database Connection Estbalished");
    app.listen(3000, () => {
      console.log("Server is litening to the port no. 3000");
    });
  })
  .catch((error) => {
    console.error("Database Cannot be Connected.");
  });
