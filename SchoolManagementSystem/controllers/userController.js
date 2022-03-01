const userModel = require("../models").User;
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
    let user = await userModel.findByPk(userId);
    if (!user) {
      const newUser = await userModel.create({
        firstName,
        lastName,
        email,
        password,
        userId,
        isTeacher,
      });
      res.status(200).send(newUser);
    } else {
      res.status(400).send("User already exists");
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: error.toString() + "\n Err! Something went wrong *_* " });
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
    const users = await usersModel.findAll();
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
const getAllStudents = async (req, res) => {
  try {
    const users = await usersModel.findAll({
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
    const users = await usersModel.findAll({
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
// ---------------------------------------------- DELETE METHODS-------------------------------------------------------

module.exports = {
  getAllUsers,
  getAllStudents,
  getAllTeachers,
  createUser,
};
