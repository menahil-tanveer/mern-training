/**
 * @param req
 * @param res
 * @param next
 * @description This method is responsible for validating grade
 */
const userModel = require("../models").User;
const courseModel = require("../models").Course;
const gradeModel = require("../models").Grade;
async function validate(req, res, next) {
  const { courseId, userId, grade } = req.body;
  try {
    const user = await userModel.findOne({
      where: {
        userId,
      },
    });
    const course = await courseModel.findOne({
      where: {
        courseId,
      },
    });
    const checkForExistingGrade = await gradeModel.findOne({
      where: {
        courseId,
        userId,
      },
    });
    if (!course) res.status(404).send("Course not found!");
    else if (!user || user.role != "student")
      res.status(404).send("Student not found!");
    else if (checkForExistingGrade)
      res
        .status(500)
        .send(`This student has already been graded in ${courseId}`);
    else {
      grade.match(/^[AaBbCcDdFf][+-]?$/)
        ? next()
        : res.status(500).send("Invalid grade");
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
async function validate(req, res, next) {
  const { courseId, userId, grade } = req.body;
  try {
    const user = await userModel.findOne({
      where: {
        userId,
      },
    });
    const course = await courseModel.findOne({
      where: {
        courseId,
      },
    });
    const checkForExistingGrade = await gradeModel.findOne({
      where: {
        courseId,
        userId,
      },
    });
    if (!course) res.status(404).send({ error: "Course not found!" });
    else if (!user || user.role != "student")
      res.status(404).send({ error: "Student not found!" });
    else if (checkForExistingGrade)
      res
        .status(500)
        .send(`This student has already been graded in ${courseId}`);
    else {
      grade.match(/^[AaBbCcDdFf][+-]?$/)
        ? next()
        : res.status(500).send({ error: "Invalid grade" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
module.exports = {
  validate,
};
