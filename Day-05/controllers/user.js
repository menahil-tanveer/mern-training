const usersModel = require("../models").User;
const userProfileModel = require("../models").userProfile;

const getAllUsers = async (req, res) => {
  try {
    let users = await usersModel.findAll({
      include: userProfileModel,
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};

module.exports = {
  getAllUsers,
};
