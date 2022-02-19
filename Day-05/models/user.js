"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.userProfile, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        defaultValue: "John" /* sets default value as john instead of NULL */,
      },
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false /* Sequelize automatically adds the fields createdAt and updatedAt; this is used to disable that */,
      createdAt: true /* set this to false if not required*/,
      updatedAt:
        "updateTimestamp" /* to refer 'updatedAt' as 'updateTimestamp' */,
    }
  );
  return User;
};
