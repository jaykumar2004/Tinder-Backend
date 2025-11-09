const adminAuth = (req, res, next) => {
  // use is for all the http requests (GET, PUT, POST,DELETE)
  console.log("Admin Auth is Checked");
  const token = "xyz"; // if the token is valid then it will move to the next route
  const authorizedUser = token === "xyz";
  if (!authorizedUser) {
    res.status(401).send("Unauthorized User");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User Auth is Checked");
  const token = "xyz";
  const authorizedUser = token === "xyz";
  if (!authorizedUser) {
    res.status(401).send("Unauthorized User");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
