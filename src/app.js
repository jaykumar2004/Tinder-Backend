const express = require("express");
const connectDb = require("./config/database.js");
const User = require("./models/user.js");
const app = express();

app.use(express.json());

//Get User by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

// Feed api - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(404).send("Something Went Wrong");
  }
});

//signup api
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//delete api
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted");
  } catch (error) {
    res.status(404).send("Something Went Wrong");
  }
});

//update user api
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  const ALLOWED_UPDATED = [
    "userId",
    "photoUrl",
    "about",
    "gender",
    "age",
    "skills",
  ];

  const isUpdateAllowed = Object.keys(data).every((k) =>
    ALLOWED_UPDATED.includes(k)
  );

  if (!isUpdateAllowed) {
    res.status(400).send("Update not allowed");
  }

  try {
    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true, // this is for the enbaling the validation
    }); // or we can write (userId, data)
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(404).send("Update Failed" + err.message);
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
