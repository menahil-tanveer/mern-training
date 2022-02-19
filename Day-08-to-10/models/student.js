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
    }
  }
  Student.init(
    {
      firstName: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
          max: 23, // only allow values <= 23
          min: 2,
          notEmpty: true,
          isLowercase: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
          max: 23, // only allow values <= 23
          min: 2,
          notEmpty: true,
          isLowercase: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          notEmpty: true,
          isLowercase: true,
        },
      },
      roll_no: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isAlphanumeric: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Student",
    }
  );
  return Student;
};
