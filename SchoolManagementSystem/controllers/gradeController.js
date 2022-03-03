const gradeModel = require("../models").Grade;
// ---------------------------------------------- CREATE METHODS----------------------------------------------------
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for assigning a grade to student
 */
const assignGrade = async (req, res) => {
  let { courseId, userId, grade } = req.body;
  try {
    const assignedGrade = await gradeModel.create({
      courseId,
      userId,
      grade,
    });
    res.status(200).send(assignedGrade);
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
// ---------------------------------------------- UPDATE METHODS-------------------------------------------------------
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for updating grade of a student
 */
const updateGrade = async (req, res) => {
  const { courseId, userId } = req.body;
  try {
    const entity = await gradeModel.findOne({
      where: {
        userId,
        courseId,
      },
    });
    if (!entity) res.status(404).send("Student not found");
    else {
      const updatedGrade = await entity.update(req.body);
      await entity.save();
      res.status(200).send(updatedGrade);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ---------------------------------------------- DELETE METHODS-------------------------------------------------------
/**
 *
 * @param req
 * @param res
 * @description This method is responsible for deleting assigned grade
 */
const deleteGrade = async (req, res) => {
  const { courseId, userId } = req.body;
  try {
    const entity = await gradeModel.findOne({
      where: {
        userId,
        courseId,
      },
    });
    if (!entity) res.status(404).send("Student not found");
    else {
      await entity.destroy();
      res.status(200).send("Grade deleted");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  assignGrade,
  updateGrade,
  deleteGrade,
};
