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
      course_id: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isAlphanumeric: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
          max: 23, // only allow values <= 23
          min: 2,
          notEmpty: true,
          isLowercase: true,
        },
      },
      creditHours: {
        type: DataTypes.INTEGER,
        notEmpty: true,
        isInt: true,
        max: 4,
        min: 1,
      },
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
