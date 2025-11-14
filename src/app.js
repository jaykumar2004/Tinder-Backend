const express = require("express");
const connectDb = require("./config/database.js");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

//routes
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/requests.js");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);



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