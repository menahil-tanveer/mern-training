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
    }
  }
  Course.init(
    {
      courseId: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: [3, 50],
          notEmpty: true,
        },
        set(value) {
          this.setDataValue("courseId", value.toUpperCase().trim());
        },
      },
      courseName: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 50],
          is: /^[a-zA-Z ]+$/i,
          notEmpty: true,
        },
        set(value) {
          this.setDataValue("courseName", value.toLowerCase().trim());
        },
      },
      creditHours: {
        type: DataTypes.INTEGER,
        min: 1,
        max: 4,
      },
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
