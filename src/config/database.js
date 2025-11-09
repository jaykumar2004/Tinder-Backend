const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://jangidkumarjay2004_db_user:jaykumar2004@nodejs.b5v8aea.mongodb.net/tinder"
  );
};



module.exports = connectDb;
