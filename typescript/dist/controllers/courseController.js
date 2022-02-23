"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllCourses = exports.getAllCourses = void 0;
const courseModel = require("../models/course");
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield courseModel.findAll();
        res.status(200).send(courses);
    }
    catch (error) {
        res.status(400).json({ error: error.toString() });
    }
});
exports.getAllCourses = getAllCourses;
const deleteAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield courseModel.destroy({
            where: {},
            truncate: true,
        });
        res.status(200).send("All Courses Deleted");
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteAllCourses = deleteAllCourses;
// module.exports = {
//   getAllCourses,
//   deleteAllCourses,
// };
//# sourceMappingURL=courseController.js.map