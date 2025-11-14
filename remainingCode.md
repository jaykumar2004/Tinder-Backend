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

    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true, // this is for the enbaling the validation
    }); // or we can write (userId, data)
    res.send("User Updated Successfully");

} catch (err) {
res.status(404).send("Update Failed" + err.message);
}
});
