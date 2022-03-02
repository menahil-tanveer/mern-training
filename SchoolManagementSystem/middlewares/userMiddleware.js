const Joi = require("joi");
/**
 * @param req
 * @param res
 * @param next
 * @description This method is responsible for validating student input data
 */
function validateUser(req, res, next) {
  const { firstName, lastName, email, password, userId, isTeacher } = req.body;
  let payload = {
    userId: userId ? userId.toLowerCase().trim() : null,
    firstName: firstName ? firstName.toLowerCase().trim() : null,
    lastName: lastName ? lastName.toLowerCase().trim() : null,
    email: email ? email.toLowerCase().trim() : null,
    password: password ? password.trim() : null,
    isTeacher: isTeacher ? isTeacher.trim() : false,
  };
  try {
    const schema = Joi.object().keys({
      firstName: Joi.string()
        .regex(/^[A-Za-z]+$/)
        .min(2)
        .max(50)
        .required(),
      lastName: Joi.string()
        .regex(/^[A-Za-z]+$/)
        .min(2)
        .max(50)
        .required(),
      email: Joi.string()
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .required(),
      password: Joi.string()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) // Minimum 8 characters & at least one letter & one digit
        .min(8)
        .max(50)
        .required(),
      userId: Joi.string()
        .regex(/^[A-Za-z0-9-]+$/)
        .min(2)
        .max(50)
        .required(),
      isTeacher: Joi.boolean().required(),
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
      firstName: Joi.string()
        .regex(/^[A-Za-z]+$/)
        .min(2)
        .max(50),
      lastName: Joi.string()
        .regex(/^[A-Za-z]+$/)
        .min(2)
        .max(50),
      email: Joi.string().regex(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      ),
      password: Joi.string()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) // Minimum 8 characters & at least one letter & one digit
        .min(8)
        .max(50),
      userId: Joi.string()
        .regex(/^[A-Za-z0-9-]+$/)
        .min(2)
        .max(50),
      isTeacher: Joi.boolean(),
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
  validateUser,
  validateUpdationData,
};
