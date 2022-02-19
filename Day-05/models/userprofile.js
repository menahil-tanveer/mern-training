"use strict";
const { Model } = require("sequelize");
const User = require("../models").User;

module.exports = (sequelize, DataTypes) => {
  class userProfile extends Model {
    // getFullname() {
    //   return [this.firstname, this.lastname].join(' ');
    // }
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
      firstName: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("firstName", value.toLowerCase().trim());
        },
      },
      lastName: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("lastName", value.toLowerCase().trim());
        },
      },
      DOB: DataTypes.DATEONLY /* DATE without time */,
      gender: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("gender", value.toLowerCase().trim());
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          // This is a reference to another model
          model: User,
          // This is the column name of the referenced model
          key: "id",
          // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
          // deferrable: Deferrable.INITIALLY_IMMEDIATE,
          // Options:
          // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
          // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
          // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
        },
      },
    },
    {
      sequelize,
      modelName: "userProfile",
      // Using `unique: true` in an attribute above is exactly the same as creating the index in the model's options:
      // indexes: [{ unique: true, fields: ["someUnique"] }],
    }
  );
  // console.log(user.getFullname());
  return userProfile;
};
