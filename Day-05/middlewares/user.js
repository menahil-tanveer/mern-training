//method to validate user data
function validateUserFirstName(req, res, next) {
  console.log("req:::::", req.body);
  // res.send(req);
  try {
    if (req.body.firstName.length) {
      next();
    } else {
      throw new Error("validation failed:::::::");
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
function validateUserEmail(req, res, next) {
  try {
    if (req.body.email.length) {
      next();
    } else {
      throw new Error("validation failed:::::::");
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
module.exports = {
  validateUserFirstName,
  validateUserEmail,
};
