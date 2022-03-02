const Joi = require("joi");
/**
 * @param req
 * @param res
 * @param next
 * @description This method is responsible for validating admin input data
 */
function validateAdmin(req, res, next) {
  const { fullName, email, password, adminId } = req.body;
  let payload = {
    adminId: adminId ? adminId.toLowerCase().trim() : null,
    fullName: fullName ? fullName.toLowerCase().trim() : null,
    email: email ? email.toLowerCase().trim() : null,
    password: password ? password.trim() : null,
  };
  try {
    const schema = Joi.object().keys({
      fullName: Joi.string()
        .regex(/^[A-Za-z]+$/)
        .min(2)
        .max(100)
        .required(),
      email: Joi.string()
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .required(),
      password: Joi.string()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) // Minimum 8 characters & at least one letter & one digit
        .min(8)
        .max(50)
        .required(),
      adminId: Joi.string()
        .regex(/^[A-Za-z0-9-]+$/)
        .min(2)
        .max(50)
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
/**
 * @param req
 * @param res
 * @param next
 * @description This method is responsible for validating updated data
 */
function validateUpdationData(req, res, next) {
  try {
    const schema = Joi.object().keys({
      fullName: Joi.string()
        .regex(/^[A-Za-z]+$/)
        .min(2)
        .max(100)
        .required(),
      email: Joi.string()
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .required(),
      password: Joi.string()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) // Minimum 8 characters & at least one letter & one digit
        .min(8)
        .max(50)
        .required(),
      adminId: Joi.string()
        .regex(/^[A-Za-z0-9-]+$/)
        .min(2)
        .max(50)
        .required(),
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
  validateAdmin,
  validateUpdationData,
};
