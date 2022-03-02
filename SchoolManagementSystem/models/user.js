"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Course, {
        through: "Registrations",
        foreignKey: "userId",
      });
    }
  }
  User.init(
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
      firstName: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 50],
          is: /^[a-zA-Z]+$/i,
          notEmpty: true,
        },
        set(value) {
          this.setDataValue("firstName", value.toLowerCase().trim());
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          len: [2, 50],
          is: /^[a-zA-Z]+$/i,
        },
        set(value) {
          this.setDataValue("lastName", value.toLowerCase().trim());
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
      role: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
