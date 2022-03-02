"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init(
    {
      adminId: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        validate: {
          len: [5, 50],
          notEmpty: true,
        },
        set(value) {
          this.setDataValue("adminId", value.toUpperCase().trim());
        },
      },
      fullName: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 100],
          is: /^[a-zA-Z ]+$/i,
          notEmpty: true,
        },
        set(value) {
          this.setDataValue("fullName", value.toLowerCase().trim());
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        len: [2, 50],
        validate: {
          notEmpty: true,
          isEmail: true,
        },
        set(value) {
          this.setDataValue("email", value.toLowerCase().trim());
        },
      },
      password: {
        type: DataTypes.STRING,
        len: [8, 64],
        validate: {
          notEmpty: true,
        },
        set(value) {
          const hash = bcrypt.hashSync(value, 10);
          this.setDataValue("password", hash);
        },
      },
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};
