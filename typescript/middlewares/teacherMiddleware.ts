const Joi = require("joi");
/**
 * @param req
 * @param res
 * @param next
 * @description This method is responsible for validating student input data
 */
function validateTeacher(req, res, next) {
  const { firstName, lastName, email, roll_no } = req.body;
  let payload = {
    firstName: firstName.toLowerCase().trim(),
    lastName: lastName.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    roll_no: roll_no.trim(),
  };
  try {
    const schema = Joi.object().keys({
      firstName: Joi.string()
        .regex(/^[A-Za-z]+$/)
        .min(2)
        .max(24)
        .required(),
      lastName: Joi.string()
        .regex(/^[A-Za-z]+$/)
        .min(2)
        .max(24)
        .required(),
      email: Joi.string()
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .required(),
      teacher_id: Joi.string()
        .regex(/^[A-Za-z0-9]+$/)
        .required(),
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
module.exports = {
  validateTeacher,
};
