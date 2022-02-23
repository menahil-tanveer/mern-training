'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentCourseJunction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudentCourseJunction.init({
    course_id: DataTypes.STRING,
    roll_no: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StudentCourseJunction',
  });
  return StudentCourseJunction;
};