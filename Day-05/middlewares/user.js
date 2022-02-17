//method to validate user data
function validateUser(req, res, next) {
  try {

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
module.exports = {
  validateUser,
};
