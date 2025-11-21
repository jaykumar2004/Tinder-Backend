const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName) {
    throw new Error("First name is not Valid.");
  } else if (!lastName) {
    throw new Error("Last name is not valid.");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid. Please enter the correct Email!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password.");
  }

  if (firstName && !/^[A-Z]/.test(firstName)) {
    throw new Error("First Name should be capital");
  } else if (lastName && !/^[A-Z]/.test(lastName)) {
    throw new Error("Last Name should be capital");
  }
};

const validateEditProfileData = (req) => {
  const { skills, age, firstName, lastName } = req.body;

  // Skills validation (only if provided)
  if (skills) {
    if (!Array.isArray(skills)) {
      throw new Error("Skills must be an array");
    }
    if (skills.length > 20) {
      throw new Error("Skills cannot be greater than 20");
    }
  }

  // Name validation (only if user tries to change them)
  if (firstName && firstName.length < 3) {
    throw new Error("First Name must be at least 3 chars");
  }

  if (lastName && lastName.length < 3) {
    throw new Error("Last Name must be at least 3 chars");
  }

  // Age validation
  if (age && age < 18) {
    throw new Error("Age must be 18 or above");
  }

  // Allowed fields validation
  const allowedEditFields = [
    "firstName",
    "lastName",
    "gender",
    "age",
    "photoUrl",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  if (!isEditAllowed) {
    throw new Error("Invalid Edit Request");
  }

  return true;
};

module.exports = {
  validateSignupData,
  validateEditProfileData,
};
