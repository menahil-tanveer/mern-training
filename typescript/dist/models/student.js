"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Student.belongsToMany(models.Course, {
                through: "StudentCourseJunction",
                foreignKey: "roll_no",
            });
        }
    }
    Student.init({
        firstName: {
            type: DataTypes.STRING,
            validate: {
                len: [2, 24],
                is: /^[a-zA-Z]+$/i,
                isLowercase: true,
            },
            set(value) {
                this.setDataValue("firstName", value.toLowerCase().trim());
            },
        },
        lastName: {
            type: DataTypes.STRING,
            validate: {
                len: [2, 24],
                is: /^[a-zA-Z]+$/i,
                isLowercase: true,
            },
            set(value) {
                this.setDataValue("lastName", value.toLowerCase().trim());
            },
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true,
                isLowercase: true,
            },
            set(value) {
                this.setDataValue("email", value.toLowerCase().trim());
            },
        },
        roll_no: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                notEmpty: true,
                isAlphanumeric: true,
            },
            set(value) {
                this.setDataValue("roll_no", value.trim());
            },
            primaryKey: true,
        },
    }, {
        sequelize,
        modelName: "Student",
        hooks: {
            beforeCreate(student, options) {
                student.roll_no = `COMSATS-${student.roll_no}`;
            },
        },
    });
    return Student;
};
//# sourceMappingURL=student.js.map