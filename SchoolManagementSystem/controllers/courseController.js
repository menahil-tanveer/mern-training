const jwt = require("jsonwebtoken");
const courseModel = require("../models").Course;
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
 * @description This method is responsible for adding course in school database
 */
const createCourse = async (req, res) => {
  let { courseId, courseName, creditHours } = req.body;
  try {
    const newCourse = await courseModel.create({
      courseId,
      courseName,
      creditHours,
    });
    res.status(200).send(newCourse);
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
 * @description This method is responsible for fetching all courses from database
 */
const getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.findAll();
    res.status(200).send(courses);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @description This method is responsible for fetching course by id
 *
 */
const getCourseById = async (req, res) => {
  try {
    const course = await courseModel.findOne({
      where: {
        courseId: req.params.courseId,
      },
    });
    if (!course) res.status(404).send("Course not found!");
    else {
      res.status(200).send(course);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ---------------------------------------------- UPDATE METHODS-------------------------------------------------------
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for updating course data in database
 */
const updateCourse = async (req, res) => {
  try {
    console.log("req.params.id:::::::", req.body);
    const course = await courseModel.findOne({
      where: {
        courseId: req.params.courseId,
      },
    });
    if (!course) res.status(404).send("Course not found");
    else {
      const updatedCourse = await course.update(req.body);
      await course.save();
      res.status(200).send(updatedCourse);
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
 * @description This method is responsible for deleting course from database
 */
const deleteCourse = async (req, res) => {
  try {
    const course = await courseModel.findOne({
      where: {
        courseId: req.params.courseId,
      },
    });
    if (!course) res.status(404).send("Course not found");
    else {
      await course.destroy({
        where: {
          courseId: req.params.courseId,
        },
      });
      res.status(200).send("Course successfully deleted");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  login,
};
