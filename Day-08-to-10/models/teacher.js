"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Teacher.init(
    {
      firstName: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
          len: [2, 24],
          notEmpty: true,
        },
        set(value) {
          this.setDataValue("firstName", value.toLowerCase().trim());
        },
        get(value) {
          return value.upperCase();
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
          len: [2, 24],
          notEmpty: true,
        },
        set(value) {
          this.setDataValue("lastName", value.toLowerCase().trim());
        },
        get(value) {
          return value.upperCase();
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
        set(value) {
          this.setDataValue("email", value.toLowerCase().trim());
        },
      },
      teacher_id: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isAlphanumeric: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Teacher",
    }
  );
  return Teacher;
};
