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
  Course.init(
    {
      course_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
          notEmpty: true,
          // isAlphanumeric: true,
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
        // set(value) {
        //   this.setDataValue("name", value.toLowerCase());
        // },
      },
      creditHours: {
        type: DataTypes.INTEGER,
        notEmpty: true,
        isInt: true,
        max: 4,
        min: 1,
      },
      // set(value) {
      //   this.setDataValue("creditHours", value.trim());
      // },
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
