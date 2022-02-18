"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userProfile.hasOne(models.User, { foreignKey: "id" });
    }
  }
  userProfile.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      DOB: DataTypes.DATE,
      gender: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "userProfile",
    }
  );
  return userProfile;
};
