const Joi = require("joi");
/**
 * @param req
 * @param res
 * @param next
 * @description This method is responsible for validating course input data
 */
function validateCourse(req, res, next) {
  const { courseId, courseName, creditHours } = req.body;
  let payload = {
    courseId: courseId ? courseId.toLowerCase().trim() : null,
    courseName: courseName ? courseName.toLowerCase().trim() : null,
    creditHours: creditHours,
  };
  try {
    const schema = Joi.object().keys({
      courseName: Joi.string()
        .regex(/^[A-Za-z ]+$/)
        .min(2)
        .max(50)
        .required(),
      courseId: Joi.string()
        .regex(/^[A-Za-z0-9-]+$/)
        .min(2)
        .max(50)
        .required(),
      creditHours: Joi.number().integer().min(1).max(4).required(),
    });
    const result = schema.validate(payload);
    if (result.error) {
      {
        return res.status(400).json({
          success: false,
          msg: result.error.details.map((i) => i.message).join(","),
        });
      }
    } else next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
/**
 * @param req
 * @param res
 * @param next
 * @description This method is responsible for validating updated data
 */
function validateUpdationData(req, res, next) {
  try {
    const schema = Joi.object().keys({
      courseName: Joi.string()
        .regex(/^[A-Za-z]+$/)
        .min(2)
        .max(50)
        .required(),
      courseId: Joi.string()
        .regex(/^[A-Za-z0-9-]+$/)
        .min(2)
        .max(50)
        .required(),
      creditHours: Joi.number().integer().min(1).max(4).required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      {
        return res.status(400).json({
          success: false,
          msg: result.error.details.map((i) => i.message).join(","),
        });
      }
    } else next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
module.exports = {
  validateCourse,
  validateUpdationData,
};
