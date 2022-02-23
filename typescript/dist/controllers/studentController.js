"use strict";
// const studentModel = require("../models").Student;
// const courseModel = require("../models").Course;
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllStudents =
  exports.deleteStudent =
  exports.getStudentById =
  exports.getAllStudents =
  exports.assignCourse =
  exports.createStudent =
    void 0;
var process = require("process");
let _path = process.cwd();
// const usersModel = require(_path + “/models”).User;
const studentModel = require(_path + "/models").Student;
const courseModel = require(_path + "/models").Course;
// const { Op } = require("sequelize");
// ------------------------------------- CREATE METHOD -------------------------------------
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for adding student to db
 */
const createStudent = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let { firstName, lastName, email, roll_no } = req.body;
    try {
      const student = yield studentModel.create({
        firstName,
        lastName,
        email,
        roll_no,
      });
      res.status(200).send(student);
    } catch (error) {
      res.status(400).json({ error: error.toString() + "\n bruh :|" });
    }
  });
exports.createStudent = createStudent;
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for assigning a course to student
 */
const assignCourse = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let { course_id, roll_no } = req.body;
    try {
      let student = yield studentModel.findByPk(roll_no);
      let course = yield courseModel.findByPk(course_id);
      if (!student) res.status(404).send("Student not found!");
      else if (!course) res.status(404).send("Course not found!");
      else {
        student.addCourse(course);
        res.status(200).send("result");
      }
    } catch (error) {
      res.status(500).json({ error: error.message + "\n bruh :|" });
    }
  });
exports.assignCourse = assignCourse;
// ------------------------------------- FETCH METHODS -------------------------------------
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for fetching all students
 */
const getAllStudents = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const students = yield studentModel.findAll({
        include: courseModel,
      });
      res.status(200).send(students);
    } catch (error) {
      res.status(400).json({ error: error.toString() });
    }
  });
exports.getAllStudents = getAllStudents;
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for fetching a student by id
 */
const getStudentById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const student = yield studentModel.findOne({
        // include: courseModel,
        where: {
          id: req.params.id,
        },
      });
      if (!student) res.status(404).send("Student not found!");
      else {
        let result = yield student.getCourses();
        // student.addCourse(course);
        console.log("student courses", result);
        res.status(200).send(result);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
exports.getStudentById = getStudentById;
// ------------------------------------- DELETION METHODS -------------------------------------
/**
 *
 * @param req
 * @param res
 * @description this method is responsible for deleting student by id
 */
const deleteStudent = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const student = yield studentModel.findOne({
        include: courseModel,
        where: {
          id: req.params.id,
        },
      });
      if (!student) res.status(404).send("Student not found!");
      else {
        yield studentModel.destroy({
          where: {
            id: req.params.id,
          },
        });
        res.status(200).send("Student deleted!");
      }
    } catch (error) {
      res.status(500).json({ error: error.message + "bruhhh come on" });
    }
  });
exports.deleteStudent = deleteStudent;
/**
 *
 * @param req
 * @param res
 * @description this method is responsible for deleting all students
 */
const deleteAllStudents = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield studentModel.destroy({
        where: {},
        truncate: true,
      });
      res.status(200).send("All Students Deleted");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
exports.deleteAllStudents = deleteAllStudents;
// module.exports = {
//   getAllStudents,
//   getStudentById,
//   deleteStudent,
//   deleteAllStudents,
//   createStudent,
//   assignCourse,
// };
//# sourceMappingURL=studentController.js.map
