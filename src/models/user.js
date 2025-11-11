const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1553217327/vector/user-profile-icon-avatar-person-sign-profile-picture-portrait-symbol-easily-editable-line.jpg?s=170667a&w=0&k=20&c=xUuHLFaa94WIFdV-XBgxX9SSsaJJgGQhE1Tmevqrytg=",
    },
    about: {
      type: String,
      default: "Default About of User",
      maxLength: 50,
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

//email check
userSchema.pre("save", async function (next) {
  const existingUser = await mongoose.models.User.findOne({
    emailId: this.emailId,
  });

  if (existingUser) {
    const err = new Error("Email already exists");
    err.status = 400;
    return next(err);
  }

  next();
});

module.exports = mongoose.model("User", userSchema);
