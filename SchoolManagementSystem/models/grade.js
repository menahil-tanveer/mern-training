"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Grade.init(
    {
      userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        validate: {
          len: [10, 50],
          notEmpty: true,
        },
        set(value) {
          this.setDataValue("userId", value.toUpperCase().trim());
        },
      },
      courseId: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        validate: {
          len: [3, 50],
          notEmpty: true,
        },
        set(value) {
          this.setDataValue("courseId", value.toUpperCase().trim());
        },
      },
      grade: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 2],
          is: /^[AaBbCcDdFf][+-]?$/,
        },
        set(value) {
          this.setDataValue("grade", value.toUpperCase().trim());
        },
      },
    },
    {
      sequelize,
      modelName: "Grade",
    }
  );
  return Grade;
};
