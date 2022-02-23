"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStudent = void 0;
const Joi = require("joi");
/**
 * @param req
 * @param res
 * @param next
 * @description This method is responsible for validating student input data
 */
function validateStudent(req, res, next) {
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
            roll_no: Joi.string()
                .regex(/^[A-Za-z0-9]+$/)
                .min(2)
                .max(24)
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
        }
        else
            next();
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}
exports.validateStudent = validateStudent;
// module.exports = {
//   validateStudent,
// };
//# sourceMappingURL=studentMiddlewares.js.map