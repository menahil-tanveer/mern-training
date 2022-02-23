"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Course.belongsTo(models.Student, { foreignKey: "roll_no" });
            Course.belongsToMany(models.Student, {
                through: "StudentCourseJunction",
                foreignKey: "course_id",
            });
        }
    }
    Course.init({
        course_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            validate: {
                notEmpty: true,
            },
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                isAlpha: true,
                len: [2, 24],
                notEmpty: true,
                isLowercase: true,
            },
            set(value) {
                this.setDataValue("name", value.toLowerCase());
            },
            get(value) {
                value.toUpperCase();
            },
        },
        creditHours: {
            type: DataTypes.INTEGER,
            notEmpty: true,
            isInt: true,
            len: [1, 4],
        },
    }, {
        sequelize,
        modelName: "Course",
    });
    return Course;
};
//# sourceMappingURL=course.js.map