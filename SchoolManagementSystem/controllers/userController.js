const jwt = require("jsonwebtoken");
const userModel = require("../models").User;
const login = async (req, res) => {
  jwt.sign({}, "secretKey", (err, token) => {
    res.json({ token: token });
  });
};
// ---------------------------------------------- CREATE METHODS----------------------------------------------------
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for adding user to db
 */
const createUser = async (req, res) => {
  let { firstName, lastName, email, password, userId, isTeacher } = req.body;
  try {
    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password,
      userId,
      isTeacher,
    });
    res.status(200).send(newUser);
  } catch (error) {
    if (error.errors && error.errors[0].type == "unique violation") {
      res.status(400).json({
        error: error.errors[0].message,
      });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
// ---------------------------------------------- GET METHODS-------------------------------------------------------
/**
 *
 * @param {*} req
 * @param {*} res
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
const getUserById = async (req, res) => {
  try {
    const user = await userModel.findOne({
      where: {
        userId: req.params.userId,
      },
    });
    if (!user) res.status(404).send("User not found!");
    else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
const getAllStudents = async (req, res) => {
  try {
    const users = await userModel.findAll({
      where: {
        isTeacher: "FALSE",
      },
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
const getAllTeachers = async (req, res) => {
  try {
    const users = await userModel.findAll({
      where: {
        isTeacher: "TRUE",
      },
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};
// ---------------------------------------------- UPDATE METHODS-------------------------------------------------------
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for updating user data in database
 */
const updateUser = async (req, res) => {
  try {
    console.log("req.params.id:::::::", req.body);
    const user = await userModel.findOne({
      where: {
        userId: req.params.userId,
      },
    });
    if (!user) res.status(404).send("User not found");
    else {
      const updatedUser = await user.update(req.body);
      await user.save();
      res.status(200).send(updatedUser);
    }
  } catch (error) {
    if (error.errors && error.errors[0].type == "unique violation") {
      res.status(400).json({
        error: error.errors[0].message,
      });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
// ---------------------------------------------- DELETE METHODS-------------------------------------------------------
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for deleting user from database
 */
const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findOne({
      where: {
        userId: req.params.userId,
      },
    });
    if (!user) res.status(404).send("User not found");
    else {
      await user.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send("User successfully deleted");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllUsers,
  getAllStudents,
  getAllTeachers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
};
