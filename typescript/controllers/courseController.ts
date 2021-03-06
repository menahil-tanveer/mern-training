const courseModel = require("../models/course");
export const getAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.findAll();
    res.status(200).send(courses);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};
export const deleteAllCourses = async (req, res) => {
  try {
    await courseModel.destroy({
      where: {},
      truncate: true,
    });
    res.status(200).send("All Courses Deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// module.exports = {
//   getAllCourses,
//   deleteAllCourses,
// };
