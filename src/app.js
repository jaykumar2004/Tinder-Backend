const express = require("express");
const connectDb = require("./config/database.js");
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const {validateSignupData} = require("./utils/validation.js");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

//signup api
app.post("/signup", async (req, res) => {
    try {
        //validation of data
        validateSignupData(req);

        const {firstName, lastName, emailId, password} = req.body;
        //bcrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });

        await user.save();
        res.send("User Added");
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
});

//login api
app.post("/login", async (req, res) => {
    try {
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            //creata a jwt token

            //add the token to cookie and send the response back to the user
            res.cookie("token", "adkjgfyagdhjbvfghjasdfb");
            res.send("Login Successfully");
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
});

//Get User by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const users = await User.find({emailId: userEmail});
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
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
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
            throw new Error(" : Update Not Allowed");
        }

        if (data?.skills?.length > 10) {
            throw new Error(" : Skills cannot be more than 10");
        }

        await User.findByIdAndUpdate({_id: userId}, data, {
            runValidators: true, // this is for the enbaling the validation
        }); // or we can write (userId, data)
        res.send("User Updated Successfully");
    } catch (err) {
        res.status(404).send("Update Failed" + err.message);
    }
});

//get profile

app.get("/profile", async (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    res.send("Reading Cookie");
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
