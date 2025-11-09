export const authMiddleware = (req, res, next) => {
  // use is for all the http requests (GET, PUT, POST,DELETE)
  console.log("User Auth is Checked");
  const token = "xyz"; // if the token is valid then it will move to the next route
  const authorizedUser = token === "xyz";
  if (!authorizedUser) {
    res.status(401).send("Unauthorized User");
  } else {
    next();
  }
};
