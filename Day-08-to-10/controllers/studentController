const studentModel = require("../models").Student;
const courseModel = require("../models").Course;
// const { Op } = require("sequelize");
// ------------------------------------- CREATE METHOD -------------------------------------
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for adding student to db
 */
const createStudent = async (req, res) => {
  let { firstName, lastName, email, roll_no } = req.body;
  try {
    const student = await studentModel.create({
      firstName,
      lastName,
      email,
      roll_no,
    });
    res.status(200).send(student);
  } catch (error) {
    res.status(400).json({ error: error.toString() + "\n bruh :|" });
  }
};
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for assigning a course to student
 */
const assignCourse = async (req, res) => {
  let { course_id, roll_no } = req.body;
  try {
    let student = await studentModel.findByPk(roll_no);
    let course = await courseModel.findByPk(course_id);
    if (!student) res.status(404).send("Student not found!");
    else if (!course) res.status(404).send("Course not found!");
    else {
      student.addCourse(course);
      res.status(200).send("result");
    }
  } catch (error) {
    res.status(500).json({ error: error.message + "\n bruh :|" });
  }
};
// ------------------------------------- FETCH METHODS -------------------------------------
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for fetching all students
 */
const getAllStudents = async (req, res) => {
  try {
    const students = await studentModel.findAll({
      include: courseModel,
    });
    res.status(200).send(students);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for fetching a student by id
 */
const getStudentById = async (req, res) => {
  try {
    const student = await studentModel.findOne({
      // include: courseModel,
      where: {
        id: req.params.id,
      },
    });
    if (!student) res.status(404).send("Student not found!");
    else {
      let result = await student.getCourses();
      // student.addCourse(course);
      console.log("student courses", result);
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ------------------------------------- DELETION METHODS -------------------------------------

/**
 *
 * @param req
 * @param res
 * @description this method is responsible for deleting student by id
 */
const deleteStudent = async (req, res) => {
  try {
    const student = await studentModel.findOne({
      include: courseModel,
      where: {
        id: req.params.id,
      },
    });
    if (!student) res.status(404).send("Student not found!");
    else {
      await studentModel.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send("Student deleted!");
    }
  } catch (error) {
    res.status(500).json({ error: error.message + "bruhhh come on" });
  }
};
/**
 *
 * @param req
 * @param res
 * @description this method is responsible for deleting all students
 */
const deleteAllStudents = async (req, res) => {
  try {
    await studentModel.destroy({
      where: {},
      truncate: true,
    });
    res.status(200).send("All Students Deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllStudents,
  getStudentById,
  deleteStudent,
  deleteAllStudents,
  createStudent,
  assignCourse,
};
