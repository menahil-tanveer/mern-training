function verifyToken(req, res, next) {
  // console.log("req.headers::::", req.headers);
  const bearerHeader = req.headers["authorization"];
  // console.log("typeof bearerHeader", typeof bearerHeader);
  if (typeof bearerHeader !== "undefined") {
    const brearer = bearerHeader.split(" ");
    const brearerToken = brearer[1];
    req.token = brearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = {
  verifyToken,
};
