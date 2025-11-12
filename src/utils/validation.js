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
};

module.exports = {
  validateSignupData,
};
